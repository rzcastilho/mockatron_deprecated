from django.db import models
from django.utils import timezone
from django.template import Template
from django.core.exceptions import ValidationError

from .constants import *

import hashlib, re

class Agent(models.Model):
    protocol = models.CharField(max_length=16)
    host = models.CharField(max_length=128)
    port = models.IntegerField(default=80)
    path = models.CharField(max_length=1024)
    method = models.CharField(max_length=16)
    content_type = models.CharField(max_length=64, null=True, blank=True)
    responder = models.CharField(default=SIMPLE_MOCK_RESPONDER[0], max_length=64, choices=MOCK_RESPONDERS)
    created = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return '[{}] {}://{}:{}{}'.format(self.method, self.protocol, self.host, self.port, self.path)

    def hash(self):
        return hashlib.md5(str(self).encode('utf-8')).hexdigest()

    def get_content_type(self):
        return self.content_type

    def wsdl_url(self):
        if self.content_type == 'text/xml':
            return '{}://{}:{}{}?wsdl'.format(self.protocol, self.host, self.port, self.path)
        else:
            raise Exception('There is no WSDL for Agent where content-type is different than text/xml')

class Operation(models.Model):
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE)
    name = models.CharField(max_length=128)
    input_message = models.CharField(max_length=128)
    output_message = models.CharField(max_length=128, null=True, blank=True)
    responder = models.CharField(default=SIMPLE_MOCK_RESPONDER[0], max_length=64, choices=MOCK_RESPONDERS)

    def __str__(self):
        return '{} [{}]'.format(self.agent, self.name)

    def hash(self):
        return hashlib.md5(str(self).encode('utf-8')).hexdigest()

    def get_content_type(self):
        return self.agent.content_type

    def belongs_to(self, request):
        regex = re.compile(r'<(.+:)?{}'.format(self.input_message))
        if regex.search(request.body.decode(encoding='UTF-8')):
            return True
        return False

class Response(models.Model):
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, null=True, blank=True)
    operation = models.ForeignKey(Operation, on_delete=models.CASCADE, null=True, blank=True)
    label = models.CharField(max_length=256)
    http_code = models.IntegerField(default=HTTP_CODES[0][0], choices=HTTP_CODES)
    content = models.TextField()
    enable = models.BooleanField(default=True)

    def __str__(self):
        if self.agent != None:
            return '{} [{}] {}'.format(self.agent, self.http_code, self.label)
        elif self.operation != None:
            return '{} [{}] {}'.format(self.operation, self.http_code, self.label)
        else:
            return '[{}] {}'.format(self.http_code, self.label)

    def hash(self):
        return hashlib.md5(str(self).encode('utf-8')).hexdigest()

    def template(self):
        return Template(self.content)

class Condition(models.Model):
    operator = models.CharField(max_length=16, choices=OPERATORS)
    value = models.CharField(max_length=256)

    class Meta:
        abstract = True

    def __str__(self):
        return '[{}] [{}] [{}]'.format(self.field_type, self.operator, self.value)

class RequestCondition(Condition):
    field_type = models.CharField(max_length=32, choices=REQUEST_FIELD_TYPES)


class ResponseCondition(Condition):
    field_type = models.CharField(max_length=32, choices=RESPONSE_FIELD_TYPES)


class Filter(models.Model):
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, null=True, blank=True)
    operation = models.ForeignKey(Operation, on_delete=models.CASCADE, null=True, blank=True)
    label = models.CharField(max_length=256)
    request_condition = models.OneToOneField(RequestCondition, related_name="request_condition")
    header_or_query_param = models.CharField(max_length=64, null=True, blank=True)
    response_conditions = models.ManyToManyField(ResponseCondition, related_name="response_conditions")

    def __str__(self):
        if self.header_or_query_param != None and self.header_or_query_param != '':
            return '{} ([{}] {}) {}'.format(self.label, self.header_or_query_param, self.request_condition, self.agent)
        else:
            return '{} ({}) {}'.format(self.label, self.request_condition, self.agent)

    def hash(self):
        return hashlib.md5(str(self).encode('utf-8')).hexdigest()

    def clean(self):
        if self.request_condition.field_type in ['HEADER', 'QUERY_PARAM'] and (self.header_or_query_param == None or self.header_or_query_param == ''): # HEADER
            raise ValidationError('Header field is required when request filter type is set to HTTP Header or Query Parameter')

    def evaluate_request(self, request):

        # Define source string
        if self.request_condition.field_type == 'CONTENT':
            input_value = request.body.decode("utf-8")
        elif self.request_condition.field_type == 'HEADER':
            input_value = request.META[self.header_or_query_param]
        elif self.request_condition.field_type == 'QUERY_PARAM':
            input_value = request.GET[self.header_or_query_param] if len(request.GET) > len(request.GET) else request.POST[self.header_or_query_param]

        # Return according with operator
        if self.request_condition.operator == 'EQUALS':
            return self.request_condition.value == input_value
        elif self.request_condition.operator == 'CONTAINS':
            return self.request_condition.value in input_value
        elif self.request_condition.operator == 'STARTS_WITH':
            return input_value.startswith(self.request_condition.value)
        elif self.request_condition.operator == 'ENDS_WITH':
            return input_value.endswith(self.request_condition.value)
        elif self.request_condition.operator == 'REGEX':
            regex = re.compile(self.request_condition.value)
            return len(regex.findall(input_value)) > 0

        return False
