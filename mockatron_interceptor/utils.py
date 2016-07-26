from django.core.cache import cache
from django.http import HttpResponse
from django.template import Context
from django.db.models import Q

from .models import *
from .constants import *

import hashlib, json, xmltodict

class SimpleMockStrategy:
    def __init__(self, provider):
        if isinstance(provider, Agent):
            self.responses = provider.response_set.filter(Q(enable=True))
        elif isinstance(provider, Filter):
            q = Q()
            for c in provider.response_filters.all():
                # Field definition
                if c.field_type == 'LABEL':
                    field = 'label'
                elif c.field_type == 'CONTENT':
                    field = 'content'
                elif c.field_type == 'HTTP_CODE':
                    field = 'http_code'

                # Operator definition
                if c.operator == 'EQUALS':
                    operator = ''
                elif c.operator == 'CONTAINS':
                    operator = '__contains'
                elif c.operator == 'STARTS_WITH':
                    operator = '__startswith'
                elif c.operator == 'ENDS_WITH':
                    operator = '__endswith'

                cond = (field + operator, c.value)
                q |= Q(cond)

            q &= Q(enable=True)
            print(q)
            self.responses = provider.agent.response_set.filter(q)
        self.next = 0
        self.max = self.responses.count()
        self.cache_id = provider.hash()

    def get(self):
        if self.max == 0:
            return None
        response = self.responses[self.next]
        self.next = self.next + 1
        if self.next == self.max:
            self.next = 0
        cache.set(self.cache_id, self)
        return response

def createDefaultMockResponse(agent):
    if agent.content_type == 'text/xml':
        response = Response(agent=agent, label=XML_DEFAULT_LABEL, content=XML_DEFAULT_RESPONSE)
    elif agent.content_type == 'application/json':
        response = Response(agent=agent, label=JSON_DEFAULT_LABEL, content=JSON_DEFAULT_RESPONSE)
    else:
        response = Response(agent=agent, label=UNKNOWN_DEFAULT_LABEL, content=UNKNOWN_DEFAULT_RESPONSE)
    response.save()

def responder(agent, request):

    response_method = None

    # Evaluate request with Filter
    if agent.filter_set.count() > 0:
        for f in agent.filter_set.all():
            if f.evaluate_request(request):
                response_method = cache.get(f.hash())
                if response_method == None:
                    response_method = SimpleMockStrategy(f)
                break

    # Find by cache if no filter contructs the response_method
    if response_method == None:
        response_method = cache.get(agent.hash())

    # Contruct response_method based on Agent
    if response_method == None:
        response_method = SimpleMockStrategy(agent)

    response = response_method.get()
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
