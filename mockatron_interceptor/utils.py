from django.core.cache import cache
from django.http import HttpResponse
from django.template import Context

from .models import Agent
from .models import MockResponse
from .constants import *

import hashlib, json, xmltodict

class SimpleMockStrategy:
    def __init__(self, agent):
        self.responses = agent.mockresponse_set.filter(enable=True)
        self.next = 0
        self.max = self.responses.count()

    def get(self):
        if self.max == 0:
            return None
        response = self.responses[self.next]
        self.next = self.next + 1
        if self.next == self.max:
            self.next = 0
        return response

def createDefaultMockResponse(agent):
    if agent.content_type == 'text/xml':
        mockResponse = MockResponse(agent=agent, label=XML_DEFAULT_LABEL, content=XML_DEFAULT_RESPONSE)
    elif agent.content_type == 'application/json':
        mockResponse = MockResponse(agent=agent, label=JSON_DEFAULT_LABEL, content=JSON_DEFAULT_RESPONSE)
    else:
        mockResponse = MockResponse(agent=agent, label=UNKNOWN_DEFAULT_LABEL, content=UNKNOWN_DEFAULT_RESPONSE)
    mockResponse.save()

def responder(agent, request):
    response_method = cache.get(hashlib.md5(str(agent).encode('utf-8')).hexdigest())
    if response_method == None:
        response_method = SimpleMockStrategy(agent)
    response = response_method.get()
    cache.set(hashlib.md5(str(agent).encode('utf-8')).hexdigest(), response_method)
    context = Context()
    context['request'] = request
    if request.body != b'':
        body = request.body.decode(encoding='UTF-8')
        if agent.content_type == 'text/xml':
            context['body'] = xmltodict.parse(body, process_namespaces=True)
        elif agent.content_type == 'application/json':
            context['body'] = json.loads(body)
        else:
            context['body'] = body
    return HttpResponse(response.template().render(context), status=response.http_code, content_type=agent.content_type)
