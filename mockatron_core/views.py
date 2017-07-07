from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Agent
from .utils import responder, create_default_response, extract_agent_data_from_request, create_and_return_agent, json_agent_locator
from .constants import *

import logging

logger = logging.getLogger("django")

@csrf_exempt
def process(request):
    logger.debug("Starting request process...")
    agent_data = extract_agent_data_from_request(request)
    try:
        if agent_data['content_type'] == CONTENT_TYPE_JSON:
            logger.debug("Content type equals to %s, call json agent locator...", CONTENT_TYPE_JSON)
            agent = json_agent_locator(agent_data)
        else:
            logger.debug("Content type not equals to %s, find agent on database...", CONTENT_TYPE_JSON)
            agent = Agent.objects.get(protocol=agent_data['protocol'], host=agent_data['host'], port=agent_data['port'], path=agent_data['path'], method=agent_data['method'])
        if agent.content_type == None and agent_data['content_type'] != None:
            logger.debug("Agent content type is none and request content type isn't none, than agent content type is updated...")
            agent.content_type = agent_data['content_type']
            agent.save()
    except Agent.DoesNotExist:
        logger.debug("If agent doesn't exist, create and return a new one...")
        agent = create_and_return_agent(agent_data)
    logger.debug("Request process end.")
    return responder(agent, request)
