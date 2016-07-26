from django.db import models
from django.utils import timezone
from django.template import Template
from django.core.exceptions import ValidationError

from .constants import *

import hashlib

class Agent(models.Model):
    protocol = models.CharField(max_length=16)
    host = models.CharField(max_length=128)
    port = models.IntegerField(default=80)
    path = models.CharField(max_length=1024)
    method = models.CharField(max_length=10)
    content_type = models.CharField(max_length=64, null=True, blank=True)
    headers = models.CharField(max_length=2048, null=True, blank=True)
    mock_strategy = models.CharField(default=MOCK_STRATEGY[0][0], max_length=64, choices=MOCK_STRATEGY)
    created = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return '({}) - {}://{}:{}{}'.format(self.method, self.protocol, self.host, self.port, self.path)

    def hash(self):
        return hashlib.md5(str(self).encode('utf-8')).hexdigest()

class Response(models.Model):
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE)
    label = models.CharField(max_length=256)
    http_code = models.IntegerField(default=HTTP_CODES[0][0], choices=HTTP_CODES)
    content = models.TextField()
    enable = models.BooleanField(default=True)

    def __str__(self):
        return '{} - ({}) - {}'.format(self.label, self.http_code, self.agent)

    def hash(self):
        return hashlib.md5(str(self).encode('utf-8')).hexdigest()

    def template(self):
        return Template(self.content)

class Condition(models.Model):
    field_type = models.CharField(max_length=32, choices=FIELD_TYPES)
    operator = models.CharField(max_length=16, choices=OPERATORS)
    value = models.CharField(max_length=256)

    def __str__(self):
        return 'Field Type: {} - Operator: {} - Value: {}'.format(self.field_type, self.operator, self.value)

class Filter(models.Model):
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE)
    label = models.CharField(max_length=256)
    request_filter = models.OneToOneField(Condition, related_name="request_filter")
    response_filters = models.ManyToManyField(Condition, related_name="response_filters")
    header = models.CharField(max_length=64, null=True, blank=True)

    def __str__(self):
        if self.header != None and self.header != '':
            return '{} - Condition ([{}] {}) - {}'.format(self.label, self.header, self.request_filter, self.agent)
        else:
            return '{} - Condition ({}) - {}'.format(self.label, self.request_filter, self.agent)

    def hash(self):
        return hashlib.md5(str(self).encode('utf-8')).hexdigest()

    def clean(self):
        if self.request_filter.field_type == 'HEADER' and (self.header == None or self.header == ''): # HEADER
            raise ValidationError('Header field is required when request filter type is set to HTTP Header')

    def evaluate_request(self, request):

        # Define source string
        if self.request_filter.field_type == 'CONTENT':
            input_value = request.body.decode("utf-8")
        elif self.request_filter.field_type == 'HEADER':
            input_value = request.META[self.header]

        # Return according with operator
        if self.request_filter.operator == 'EQUALS':
            return self.request_filter.value == input_value
        elif self.request_filter.operator == 'CONTAINS':
            return self.request_filter.value in input_value
        elif self.request_filter.operator == 'STARTS_WITH':
            return input_value.startswith(self.request_filter.value)
        elif self.request_filter.operator == 'ENDS_WITH':
            return input_value.endswith(self.request_filter.value)

        return False
