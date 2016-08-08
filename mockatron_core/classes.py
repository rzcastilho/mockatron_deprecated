from django.db.models import Q
from django.core.cache import cache

from .constants import *

class BaseMockResponder:
    def __init__(self, responses):
        self.responses = responses
        self.next = 0
        self.max = self.responses.count()

    def __str__(self):
        return 'Responses: {} - Next: {}'.format(self.responses.count(), self.next)

    def get(self):
        if self.max == 0:
            return None
        response = self.responses[self.next]
        self.next = self.next + 1
        if self.next == self.max:
            self.next = 0
        return response


class SimpleMockResponder(BaseMockResponder):
    def __init__(self, provider):
        super().__init__(provider.responses.filter(Q(enable=True)))
        self.cache_id = provider.hash()
        cache.set(self.cache_id, self)

    def get(self):
        response = super().get()
        cache.set(self.cache_id, self)
        return response

class FilterMockResponder:
    def __init__(self, provider):
        self.filters = provider.filters.filter(Q(enable=True))
        self.cache_id = provider.hash()
        cache.set(self.cache_id, self)

    def get_responses_by_filter(self, filter):
        query = Q()
        provider = filter.agent if filter.agent != None else filter.operation
        for c in filter.response_conditions.all():
            key = c.field_type.lower()
            if c.operator != 'EQUALS':
                key = key + "__" + c.operator.lower()
            query &= Q((key, c.value))
        return provider.responses.filter(query)

    def get(self, request):
        for f in self.filters:
            if f.evaluate_request(request):
                base_responder = cache.get(f.hash())
                if base_responder == None:
                    base_responder = BaseMockResponder(self.get_responses_by_filter(f))
                response = base_responder.get()
                cache.set(f.hash(), base_responder)
                return response

class MockResponderFactory:
    @staticmethod
    def get_mock_responder(provider):
        response_method = cache.get(provider.hash())
        if response_method != None:
            return response_method
        if provider.responder == FILTER_MOCK_RESPONDER[0] and provider.filters.all().count() > 0:
            return FilterMockResponder(provider)
        else:
            return SimpleMockResponder(provider)
