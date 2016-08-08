from rest_framework import serializers
from mockatron_interceptor.models import *

class AgentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agent
        fields = ('id', 'protocol', 'host', 'port', 'path', 'method', 'content_type', 'responder', 'created', 'operations', 'responses', 'filters')

class OperationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Operation
        fields = ('id', 'agent', 'name', 'input_message', 'output_message', 'responder', 'responses', 'filters')

class ResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Response
        fields = ('id', 'agent', 'operation', 'label', 'http_code', 'content', 'enable')

class FilterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filter
        fields = ('id', 'agent', 'operation', 'label', 'priority', 'enable', 'request_conditions', 'response_conditions')

class RequestConditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = RequestCondition
        fields = ('id', 'field_type', 'header_or_query_param', 'operator', 'value')

class ResponseConditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResponseCondition
        fields = ('id', 'field_type', 'operator', 'value')
