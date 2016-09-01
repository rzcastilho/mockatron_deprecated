from django.conf.urls import url
from rest_framework.authtoken import views as authtoken_views
from . import views

urlpatterns = [
    url(r'^token/', authtoken_views.obtain_auth_token),
    url(r'^signup/', views.SignUp.as_view()),
    # Resume
    url(r'^resume/$', views.Resume.as_view()),
    # Users (Read Only)
    url(r'^users/$', views.UserList.as_view()),
    url(r'^users/(?P<pk>[0-9]+)$', views.UserDetail.as_view()),
    # Agents
    url(r'^agents/$', views.AgentList.as_view()),
    url(r'^agents/(?P<pk>[0-9]+)$', views.AgentDetail.as_view()),
    # Operations
    url(r'^operations/$', views.OperationList.as_view()),
    url(r'^operations/(?P<pk>[0-9]+)$', views.OperationDetail.as_view()),
    # Responses
    url(r'^responses/$', views.ResponseList.as_view()),
    url(r'^responses/(?P<pk>[0-9]+)$', views.ResponseDetail.as_view()),
    # Filters
    url(r'^filters/$', views.FilterList.as_view()),
    url(r'^filters/(?P<pk>[0-9]+)$', views.FilterDetail.as_view()),
    #Request Conditions
    url(r'^request_conditions/$', views.RequestConditionList.as_view()),
    url(r'^request_conditions/(?P<pk>[0-9]+)$', views.RequestConditionDetail.as_view()),
    #Response Conditions
    url(r'^response_conditions/$', views.ResponseConditionList.as_view()),
    url(r'^response_conditions/(?P<pk>[0-9]+)$', views.ResponseConditionDetail.as_view()),
    # Operations By Agent
    url(r'^agents/(?P<pk_agent>[0-9]+)/operations/$', views.OperationListByAgent.as_view()),
    url(r'^agents/(?P<pk_agent>[0-9]+)/operations/(?P<pk>[0-9]+)$', views.OperationDetailByAgent.as_view()),
    # Responses By Agent
    url(r'^agents/(?P<pk_agent>[0-9]+)/responses/$', views.ResponseListByAgent.as_view()),
    url(r'^agents/(?P<pk_agent>[0-9]+)/responses/(?P<pk>[0-9]+)$', views.ResponseDetailByAgent.as_view()),
    # Responses By Operation
    url(r'^operations/(?P<pk_operation>[0-9]+)/responses/$', views.ResponseListByOperation.as_view()),
    url(r'^operations/(?P<pk_operation>[0-9]+)/responses/(?P<pk>[0-9]+)$', views.ResponseDetailByOperation.as_view()),
    # Filters By Agent
    url(r'^agents/(?P<pk_agent>[0-9]+)/filters/$', views.FilterListByAgent.as_view()),
    url(r'^agents/(?P<pk_agent>[0-9]+)/filters/(?P<pk>[0-9]+)$', views.FilterDetailByAgent.as_view()),
    # Filters By Operation
    url(r'^operations/(?P<pk_operation>[0-9]+)/filters/$', views.FilterListByOperation.as_view()),
    url(r'^operations/(?P<pk_operation>[0-9]+)/filters/(?P<pk>[0-9]+)$', views.FilterDetailByOperation.as_view()),
    #Request Conditions By Filter
    url(r'^filters/(?P<pk_filter>[0-9]+)/request_conditions/$', views.RequestConditionListByFilter.as_view()),
    url(r'^filters/(?P<pk_filter>[0-9]+)/request_conditions/(?P<pk>[0-9]+)$', views.RequestConditionDetailByFilter.as_view()),
    #Response Conditions By Filter
    url(r'^filters/(?P<pk_filter>[0-9]+)/response_conditions/$', views.ResponseConditionListByFilter.as_view()),
    url(r'^filters/(?P<pk_filter>[0-9]+)/Response_conditions/(?P<pk>[0-9]+)$', views.ResponseConditionDetailByFilter.as_view()),
]
