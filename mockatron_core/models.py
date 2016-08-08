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

    class Meta:
        unique_together = ('protocol', 'host', 'port', 'path', 'method')

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
            raise Exception('There is no WSDL for Agent when content-type is different than text/xml')


class Operation(models.Model):
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, related_name='operations')
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
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, null=True, blank=True, related_name='responses')
    operation = models.ForeignKey(Operation, on_delete=models.CASCADE, null=True, blank=True, related_name='responses')
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

    def clean(self):
        if self.agent == None and self.operation == None:
            raise ValidationError('Agent or Operation is required')
        elif self.agent != None and self.operation != None:
            raise ValidationError('Agent or Operation is required, you can\'t fill both')

class Filter(models.Model):
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, null=True, blank=True, related_name='filters')
    operation = models.ForeignKey(Operation, on_delete=models.CASCADE, null=True, blank=True, related_name='filters')
    label = models.CharField(max_length=256)
    priority = models.IntegerField(default=0)
    enable = models.BooleanField(default=True)

    class Meta:
        ordering = ['priority']

    def __str__(self):
        return '{} {} [{}] {}'.format(self.label, self.request_conditions.all(), self.priority, self.agent)

    def hash(self):
        return hashlib.md5(str(self).encode('utf-8')).hexdigest()

    def clean(self):
        if self.agent == None and self.operation == None:
            raise ValidationError('Agent or Operation is required')
        elif self.agent != None and self.operation != None:
            raise ValidationError('Agent or Operation is required, you can\'t fill both')

    def evaluate_request(self, request):
        result = True
        for c in self.request_conditions.all():
            # Define source string
            if c.field_type == 'CONTENT':
                input_value = request.body.decode("utf-8")
            elif c.field_type == 'HEADER':
                input_value = request.META[c.header_or_query_param]
            elif c.field_type == 'QUERY_PARAM':
                input_value = request.GET[c.header_or_query_param] if len(request.GET) > len(request.GET) else request.POST[c.header_or_query_param]

            # Return according with operator
            if c.operator == 'EQUALS':
                result = c.value == input_value
            elif c.operator == 'CONTAINS':
                result = c.value in input_value
            elif c.operator == 'STARTSWITH':
                result = input_value.startswith(c.value)
            elif c.operator == 'ENDSWITH':
                result = input_value.endswith(c.value)
            elif c.operator == 'REGEX':
                print(c.value)
                regex = re.compile(c.value)
                print(regex)
                result = len(regex.findall(input_value)) > 0

            if not result:
                return result

        print(result)
        return result

class Condition(models.Model):
    value = models.CharField(max_length=256)

    class Meta:
        abstract = True

    def __str__(self):
        return '[{}] [{}] [{}]'.format(self.field_type, self.operator, self.value)


class RequestCondition(Condition):
    filter = models.ForeignKey(Filter, on_delete=models.CASCADE, related_name='request_conditions')
    field_type = models.CharField(max_length=32, choices=REQUEST_FIELD_TYPES)
    operator = models.CharField(max_length=16, choices=REQUEST_CONDITION_OPERATORS)
    header_or_query_param = models.CharField(max_length=64, null=True, blank=True)

    def clean(self):
        if self.field_type in ['HEADER', 'QUERY_PARAM'] and (self.header_or_query_param == None or self.header_or_query_param == ''): # HEADER
            raise ValidationError('Header field is required when condition filter type is set to HTTP Header or Query Parameter')

class ResponseCondition(Condition):
    filter = models.ForeignKey(Filter, on_delete=models.CASCADE, related_name='response_conditions')
    field_type = models.CharField(max_length=32, choices=RESPONSE_FIELD_TYPES)
    operator = models.CharField(max_length=16, choices=RESPONSE_CONDITION_OPERATORS)
