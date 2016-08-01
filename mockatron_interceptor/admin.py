from django.contrib import admin

from .models import *

class OperationInline(admin.TabularInline):
    model = Operation
    extra = 0

class AgentAdmin(admin.ModelAdmin):
    inlines = [
        OperationInline,
    ]

admin.site.register(Agent, AgentAdmin)
admin.site.register(Response)
admin.site.register(Filter)
admin.site.register(RequestCondition)
admin.site.register(ResponseCondition)
