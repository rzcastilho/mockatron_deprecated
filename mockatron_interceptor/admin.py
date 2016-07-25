from django.contrib import admin

from .models import Agent, MockResponse

admin.site.register(Agent)
admin.site.register(MockResponse)
