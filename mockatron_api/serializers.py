from rest_framework import serializers
from django.contrib.auth.models import User
from mockatron_core.models import *

from .classes import *

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}
    def create(self, validated_data):
        user = User(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserReadOnlySerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'username')

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
        fields = ('id', 'filter', 'field_type', 'header_or_query_param', 'operator', 'value')

class ResponseConditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResponseCondition
        fields = ('id', 'filter', 'field_type', 'operator', 'value')
