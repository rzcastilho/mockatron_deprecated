from django.http import Http404
from django.contrib.auth.models import User
from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from mockatron_core.models import Agent, Operation, Filter, RequestCondition, ResponseCondition
from mockatron_core.models import Response as ResponseModel
from .serializers import UserReadOnlySerializer, UserCreateSerializer, AgentSerializer, OperationSerializer, ResponseSerializer, FilterSerializer, RequestConditionSerializer, ResponseConditionSerializer
from .classes import EntityResume

import json

class Resume(APIView):
    def get(self, request, format=None):
        er1 = EntityResume("agent", "Agents", Agent.objects.count())
        er2 = EntityResume("operation", "Operations", Operation.objects.count())
        er3 = EntityResume("filter", "Filters", Filter.objects.count())
        er4 = EntityResume("response", "Responses", ResponseModel.objects.count())
        #er5 = EntityResume("request_condition", "Request Conditions", RequestCondition.objects.count())
        #er6 = EntityResume("response_condition", "Response Conditions", ResponseCondition.objects.count())
        response = Response()
        response['Content-Type'] = 'application/json'
        #response.content = json.dumps([er1, er2, er3, er4, er5, er6], default=lambda o: o.__dict__, indent=4)
        response.content = json.dumps([er1, er2, er3, er4], default=lambda o: o.__dict__, indent=4)
        return response

class SignUp(APIView):
    permission_classes = [AllowAny]
    def post(self, request, format=None):
        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserReadOnlySerializer

class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserReadOnlySerializer

class AgentList(generics.ListCreateAPIView):
    queryset = Agent.objects.all()
    serializer_class = AgentSerializer

class AgentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Agent.objects.all()
    serializer_class = AgentSerializer

class OperationList(generics.ListCreateAPIView):
    queryset = Operation.objects.all()
    serializer_class = OperationSerializer

class OperationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Operation.objects.all()
    serializer_class = OperationSerializer

class ResponseList(generics.ListCreateAPIView):
    queryset = ResponseModel.objects.all()
    serializer_class = ResponseSerializer

class ResponseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ResponseModel.objects.all()
    serializer_class = ResponseSerializer

class FilterList(generics.ListCreateAPIView):
    queryset = Filter.objects.all()
    serializer_class = FilterSerializer

class FilterDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Filter.objects.all()
    serializer_class = FilterSerializer

class RequestConditionList(generics.ListCreateAPIView):
    queryset = RequestCondition.objects.all()
    serializer_class = RequestConditionSerializer

class RequestConditionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = RequestCondition.objects.all()
    serializer_class = RequestConditionSerializer

class ResponseConditionList(generics.ListCreateAPIView):
    queryset = ResponseCondition.objects.all()
    serializer_class = ResponseConditionSerializer

class ResponseConditionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ResponseCondition.objects.all()
    serializer_class = ResponseConditionSerializer

class OperationListByAgent(APIView):
    def get_object(self, pk_agent):
        try:
            return Agent.objects.get(pk=pk_agent)
        except Agent.DoesNotExist:
            raise Http404
    def get(self, request, pk_agent, format=None):
        agent = self.get_object(pk_agent)
        operations = agent.operations.all()
        serializer = OperationSerializer(operations, many=True)
        return Response(serializer.data)
    def post(self, request, pk_agent, format=None):
        agent = self.get_object(pk_agent)
        serializer = OperationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OperationDetailByAgent(APIView):
    def get_object(self, pk_agent, pk):
        try:
            agent = Agent.objects.get(pk=pk_agent)
            return agent.operations.get(pk=pk)
        except Agent.DoesNotExist:
            raise Http404
        except Operation.DoesNotExist:
            raise Http404
    def get(self, request, pk_agent, pk, format=None):
        operation = self.get_object(pk_agent, pk)
        serializer = OperationSerializer(operation)
        return Response(serializer.data)
    def put(self, request, pk_agent, pk, format=None):
        operation = self.get_object(pk_agent, pk)
        serializer = OperationSerializer(operation, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, pk_agent, pk, format=None):
        operation = self.get_object(pk_agent, pk)
        operation.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ResponseListByAgent(APIView):
    def get_object(self, pk_agent):
        try:
            return Agent.objects.get(pk=pk_agent)
        except Agent.DoesNotExist:
            raise Http404
    def get(self, request, pk_agent, format=None):
        agent = self.get_object(pk_agent)
        responses = agent.responses.all()
        serializer = ResponseSerializer(responses, many=True)
        return Response(serializer.data)
    def post(self, request, pk_agent, format=None):
        agent = self.get_object(pk_agent)
        serializer = ResponseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ResponseDetailByAgent(APIView):
    def get_object(self, pk_agent, pk):
        try:
            agent = Agent.objects.get(pk=pk_agent)
            return agent.responses.get(pk=pk)
        except Agent.DoesNotExist:
            raise Http404
        except Response.DoesNotExist:
            raise Http404
    def get(self, request, pk_agent, pk, format=None):
        response = self.get_object(pk_agent, pk)
        serializer = ResponseSerializer(response)
        return Response(serializer.data)
    def put(self, request, pk_agent, pk, format=None):
        response = self.get_object(pk_agent, pk)
        serializer = ResponseSerializer(response, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, pk_agent, pk, format=None):
        response = self.get_object(pk_agent, pk)
        response.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ResponseListByOperation(APIView):
    def get_object(self, pk_operation):
        try:
            return Operation.objects.get(pk=pk_operation)
        except Operation.DoesNotExist:
            raise Http404
    def get(self, request, pk_operation, format=None):
        operation = self.get_object(pk_operation)
        responses = operation.responses.all()
        serializer = ResponseSerializer(responses, many=True)
        return Response(serializer.data)
    def post(self, request, pk_operation, format=None):
        operation = self.get_object(pk_operation)
        serializer = ResponseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ResponseDetailByOperation(APIView):
    def get_object(self, pk_operation, pk):
        try:
            operation = Operation.objects.get(pk=pk_operation)
            return operation.responses.get(pk=pk)
        except Operation.DoesNotExist:
            raise Http404
        except Response.DoesNotExist:
            raise Http404
    def get(self, request, pk_operation, pk, format=None):
        response = self.get_object(pk_operation, pk)
        serializer = ResponseSerializer(response)
        return Response(serializer.data)
    def put(self, request, pk_operation, pk, format=None):
        response = self.get_object(pk_operation, pk)
        serializer = ResponseSerializer(response, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, pk_operation, pk, format=None):
        response = self.get_object(pk_operation, pk)
        response.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class FilterListByAgent(APIView):
    def get_object(self, pk_agent):
        try:
            return Agent.objects.get(pk=pk_agent)
        except Agent.DoesNotExist:
            raise Http404
    def get(self, request, pk_agent, format=None):
        agent = self.get_object(pk_agent)
        filters = agent.filters.all()
        serializer = FilterSerializer(filters, many=True)
        return Response(serializer.data)
    def post(self, request, pk_agent, format=None):
        agent = self.get_object(pk_agent)
        serializer = FilterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FilterDetailByAgent(APIView):
    def get_object(self, pk_agent, pk):
        try:
            agent = Agent.objects.get(pk=pk_agent)
            return agent.filters.get(pk=pk)
        except Agent.DoesNotExist:
            raise Http404
        except Filter.DoesNotExist:
            raise Http404
    def get(self, request, pk_agent, pk, format=None):
        filter = self.get_object(pk_agent, pk)
        serializer = FilterSerializer(filter)
        return Response(serializer.data)
    def put(self, request, pk_agent, pk, format=None):
        filter = self.get_object(pk_agent, pk)
        serializer = FilterSerializer(filter, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, pk_agent, pk, format=None):
        filter = self.get_object(pk_agent, pk)
        filter.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class FilterListByOperation(APIView):
    def get_object(self, pk_operation):
        try:
            return Operation.objects.get(pk=pk_operation)
        except Operation.DoesNotExist:
            raise Http404
    def get(self, request, pk_operation, format=None):
        operation = self.get_object(pk_operation)
        filters = operation.filters.all()
        serializer = FilterSerializer(filters, many=True)
        return Response(serializer.data)
    def post(self, request, pk_operation, format=None):
        operation = self.get_object(pk_operation)
        serializer = FilterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FilterDetailByOperation(APIView):
    def get_object(self, pk_operation, pk):
        try:
            operation = Operation.objects.get(pk=pk_operation)
            return operation.filters.get(pk=pk)
        except Operation.DoesNotExist:
            raise Http404
        except Filter.DoesNotExist:
            raise Http404
    def get(self, request, pk_operation, pk, format=None):
        filter = self.get_object(pk_operation, pk)
        serializer = FilterSerializer(filter)
        return Response(serializer.data)
    def put(self, request, pk_operation, pk, format=None):
        filter = self.get_object(pk_operation, pk)
        serializer = FilterSerializer(filter, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, pk_operation, pk, format=None):
        filter = self.get_object(pk_operation, pk)
        filter.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class RequestConditionListByFilter(APIView):
    def get_object(self, pk_filter):
        try:
            return Filter.objects.get(pk=pk_filter)
        except Filter.DoesNotExist:
            raise Http404
    def get(self, request, pk_filter, format=None):
        filter = self.get_object(pk_filter)
        request_conditions = filter.request_conditions.all()
        serializer = RequestConditionSerializer(request_conditions, many=True)
        return Response(serializer.data)
    def post(self, request, pk_filter, format=None):
        filter = self.get_object(pk_filter)
        serializer = RequestConditionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RequestConditionDetailByFilter(APIView):
    def get_object(self, pk_filter, pk):
        try:
            filter = Filter.objects.get(pk=pk_filter)
            return filter.request_conditions.get(pk=pk)
        except Filter.DoesNotExist:
            raise Http404
        except RequestCondition.DoesNotExist:
            raise Http404
    def get(self, request, pk_filter, pk, format=None):
        request_condition = self.get_object(pk_filter, pk)
        serializer = RequestConditionSerializer(request_condition)
        return Response(serializer.data)
    def put(self, request, pk_filter, pk, format=None):
        request_condition = self.get_object(pk_filter, pk)
        serializer = RequestConditionSerializer(request_condition, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, pk_filter, pk, format=None):
        request_condition = self.get_object(pk_filter, pk)
        request_condition.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ResponseConditionListByFilter(APIView):
    def get_object(self, pk_filter):
        try:
            return Filter.objects.get(pk=pk_filter)
        except Filter.DoesNotExist:
            raise Http404
    def get(self, response, pk_filter, format=None):
        filter = self.get_object(pk_filter)
        response_conditions = filter.response_conditions.all()
        serializer = ResponseConditionSerializer(response_conditions, many=True)
        return Response(serializer.data)
    def post(self, response, pk_filter, format=None):
        filter = self.get_object(pk_filter)
        serializer = ResponseConditionSerializer(data=response.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ResponseConditionDetailByFilter(APIView):
    def get_object(self, pk_filter, pk):
        try:
            filter = Filter.objects.get(pk=pk_filter)
            return filter.response_conditions.get(pk=pk)
        except Filter.DoesNotExist:
            raise Http404
        except ResponseCondition.DoesNotExist:
            raise Http404
    def get(self, response, pk_filter, pk, format=None):
        response_condition = self.get_object(pk_filter, pk)
        serializer = ResponseConditionSerializer(response_condition)
        return Response(serializer.data)
    def put(self, response, pk_filter, pk, format=None):
        response_condition = self.get_object(pk_filter, pk)
        serializer = ResponseConditionSerializer(response_condition, data=response.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, response, pk_filter, pk, format=None):
        response_condition = self.get_object(pk_filter, pk)
        response_condition.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
