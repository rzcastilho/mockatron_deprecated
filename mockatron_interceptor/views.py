from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Agent
from .utils import responder, create_default_response, extract_agent_data_from_request, create_and_return_agent

@csrf_exempt
def process(request):
    agent_data = extract_agent_data_from_request(request)
    try:
        agent = Agent.objects.get(protocol=agent_data['protocol'], host=agent_data['host'], port=agent_data['port'], path=agent_data['path'], method=agent_data['method'])
        if agent.content_type == None and agent_data['content_type'] != None:
            agent.content_type = agent_data['content_type'].split(";")[0]
        agent.save()
    except Agent.DoesNotExist:
        agent = create_and_return_agent(agent_data)
    return responder(agent, request)
