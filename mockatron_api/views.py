from django.http import Http404
from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from mockatron_core.models import Agent
from .serializers import AgentSerializer, OperationSerializer, ResponseSerializer, FilterSerializer

class AgentList(generics.ListCreateAPIView):
    queryset = Agent.objects.all()
    serializer_class = AgentSerializer

class AgentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Agent.objects.all()
    serializer_class = AgentSerializer

class OperationList(APIView):
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

class OperationDetail(APIView):
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
    def get_object(self, pk_agent, pk_operation):
        try:
            agent = Agent.objects.get(pk=pk_agent)
            return agent.operations.get(pk=pk_operation)
        except Agent.DoesNotExist:
            raise Http404
        except Operation.DoesNotExist:
            raise Http404
    def get(self, request, pk_agent, pk_operation, format=None):
        operation = self.get_object(pk_agent, pk_operation)
        responses = operation.responses.all()
        serializer = ResponseSerializer(responses, many=True)
        return Response(serializer.data)
    def post(self, request, pk_agent, pk_operation, format=None):
        operation = self.get_object(pk_agent, pk_operation)
        serializer = ResponseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ResponseDetailByOperation(APIView):
    def get_object(self, pk_agent, pk_operation, pk):
        try:
            agent = Agent.objects.get(pk=pk_agent)
            operation = agent.operations.get(pk=pk_operation)
            return operation.responses.get(pk=pk)
        except Agent.DoesNotExist:
            raise Http404
        except Operation.DoesNotExist:
            raise Http404
        except Response.DoesNotExist:
            raise Http404
    def get(self, request, pk_agent, pk_operation, pk, format=None):
        response = self.get_object(pk_agent, pk_operation, pk)
        serializer = ResponseSerializer(response)
        return Response(serializer.data)
    def put(self, request, pk_agent, pk_operation, pk, format=None):
        response = self.get_object(pk_agent, pk_operation, pk)
        serializer = ResponseSerializer(response, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, pk_agent, pk_operation, pk, format=None):
        response = self.get_object(pk_agent, pk_operation, pk)
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
    def get_object(self, pk_agent, pk_operation):
        try:
            agent = Agent.objects.get(pk=pk_agent)
            return agent.operations.get(pk=pk_operation)
        except Agent.DoesNotExist:
            raise Http404
        except Operation.DoesNotExist:
            raise Http404
    def get(self, request, pk_agent, pk_operation, format=None):
        operation = self.get_object(pk_agent, pk_operation)
        filters = operation.filters.all()
        serializer = FilterSerializer(filters, many=True)
        return Response(serializer.data)
    def post(self, request, pk_agent, pk_operation, format=None):
        operation = self.get_object(pk_agent, pk_operation)
        serializer = FilterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FilterDetailByOperation(APIView):
    def get_object(self, pk_agent, pk_operation, pk):
        try:
            agent = Agent.objects.get(pk=pk_agent)
            operation = agent.operations.get(pk=pk_operation)
            return operation.filters.get(pk=pk)
        except Agent.DoesNotExist:
            raise Http404
        except Operation.DoesNotExist:
            raise Http404
        except Filter.DoesNotExist:
            raise Http404
    def get(self, request, pk_agent, pk_operation, pk, format=None):
        filter = self.get_object(pk_agent, pk_operation, pk)
        serializer = FilterSerializer(filter)
        return Response(serializer.data)
    def put(self, request, pk_agent, pk_operation, pk, format=None):
        filter = self.get_object(pk_agent, pk_operation, pk)
        serializer = FilterSerializer(filter, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, pk_agent, pk_operation, pk, format=None):
        filter = self.get_object(pk_agent, pk_operation, pk)
        filter.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
