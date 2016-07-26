from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Agent
from .utils import responder, createDefaultMockResponse

@csrf_exempt
def process(request):
    protocol = request.scheme
    if 'HTTP_MOCKATRON_ORIGINAL_HOST' in request.META:
        host = request.META["HTTP_MOCKATRON_ORIGINAL_HOST"].split(":")[0]
        port = request.META["HTTP_MOCKATRON_ORIGINAL_HOST"].split(":")[1]
    else:
        host = request.META["HTTP_HOST"].split(":")[0]
        port = request.META["SERVER_PORT"]
    path = request.path
    headers = list(request.META.keys())
    method = request.method
    content_type = request.META["CONTENT_TYPE"]
    if content_type != None:
        content_type = content_type.split(";")[0]
    try:
        agent = Agent.objects.get(protocol=protocol, host=host, port=port, path=path, method=method)

        # Setting headers
        if agent.headers != None:
            agentHeaders = agent.headers.split(',')
            headers = list(set(agentHeaders + headers))
        headers.sort()
        agent.headers = ",".join(headers)

        # Setting content-type
        if agent.content_type == None and content_type != None:
            agent.content_type = content_type.split(";")[0]

        agent.save()

    except Agent.DoesNotExist:
        headers.sort()
        agent = Agent(protocol=protocol, host=host, port=port, path=path, method=method, content_type=content_type, headers=",".join(headers))
        agent.save()
        createDefaultMockResponse(agent)
    return responder(agent, request)
