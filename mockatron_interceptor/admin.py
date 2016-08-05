from django.contrib import admin

from .models import *

class OperationInline(admin.TabularInline):
    model = Operation
    extra = 0

class AgentAdmin(admin.ModelAdmin):
    inlines = [
        OperationInline,
    ]

class RequestConditionInline(admin.TabularInline):
    model = RequestCondition
    extra = 0
    fields = ['field_type', 'header_or_query_param', 'operator', 'value']

class ResponseConditionInline(admin.TabularInline):
    model = ResponseCondition
    extra = 0
    fields = ['field_type', 'operator', 'value']

class FilterAdmin(admin.ModelAdmin):
    inlines = [
        RequestConditionInline,
        ResponseConditionInline
    ]

admin.site.register(Agent, AgentAdmin)
admin.site.register(Response)
admin.site.register(Filter, FilterAdmin)
