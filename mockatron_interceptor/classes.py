from django.db.models import Q
from django.core.cache import cache

from .constants import *

class SimpleMockResponder:
    def __init__(self, provider):
        self.responses = provider.response_set.filter(Q(enable=True))
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

class FilterMockResponder(SimpleMockResponder):
    def __init__(self, provider):
        super().__init__(provider)

class MockResponderFactory:
    @staticmethod
    def new_mock_response(provider):
        if provider.responder == FILTER_MOCK_RESPONDER[0] and provider.filter_set.all().count() > 0:
            return FilterMockResponder(provider)
        else:
            return SimpleMockResponder(provider)
