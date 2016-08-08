from django.conf.urls import url

from . import views

urlpatterns = [
    # Agents
    url(r'^agents/$', views.AgentList.as_view()),
    url(r'^agents/(?P<pk>[0-9]+)$', views.AgentDetail.as_view()),
    # Operations
    url(r'^agents/(?P<pk_agent>[0-9]+)/operations/$', views.OperationList.as_view()),
    url(r'^agents/(?P<pk_agent>[0-9]+)/operations/(?P<pk>[0-9]+)$', views.OperationDetail.as_view()),
    # Responses By Agent
    url(r'^agents/(?P<pk_agent>[0-9]+)/responses/$', views.ResponseListByAgent.as_view()),
    url(r'^agents/(?P<pk_agent>[0-9]+)/responses/(?P<pk>[0-9]+)$', views.ResponseDetailByAgent.as_view()),
    # Responses By Operation
    url(r'^agents/(?P<pk_agent>[0-9]+)/operations/(?P<pk_operation>[0-9]+)/responses/$', views.ResponseListByOperation.as_view()),
    url(r'^agents/(?P<pk_agent>[0-9]+)/operations/(?P<pk_operation>[0-9]+)/responses/(?P<pk>[0-9]+)$', views.ResponseDetailByOperation.as_view()),
    # Filters By Agent
    url(r'^agents/(?P<pk_agent>[0-9]+)/filters/$', views.FilterListByAgent.as_view()),
    url(r'^agents/(?P<pk_agent>[0-9]+)/filters/(?P<pk>[0-9]+)$', views.FilterDetailByAgent.as_view()),
    # Filters By Operation
    url(r'^agents/(?P<pk_agent>[0-9]+)/operations/(?P<pk_operation>[0-9]+)/filters/$', views.FilterListByOperation.as_view()),
    url(r'^agents/(?P<pk_agent>[0-9]+)/operations/(?P<pk_operation>[0-9]+)/filters/(?P<pk>[0-9]+)$', views.FilterDetailByOperation.as_view())
]
