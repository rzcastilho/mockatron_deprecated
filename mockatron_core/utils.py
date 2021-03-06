from django.http import HttpResponse
from django.template import Context

from .models import *
from .constants import *
from .classes import *

from xml.etree import ElementTree

import hashlib, json, xmltodict, re, urllib.request, logging

logger = logging.getLogger("django")

def extract_agent_data_from_request(request):
    result = {}
    if "HTTP_X_FORWARDED_PROTO" in request.META:
        result['protocol'] = request.META["HTTP_X_FORWARDED_PROTO"]
    else:
        result['protocol'] = request.scheme
    logger.info(request.META)
    if 'HTTP_X_MOCKATRON_ORIGINAL_HOST' in request.META:
        result['host'] = request.META["HTTP_X_MOCKATRON_ORIGINAL_HOST"].split(":")[0]
        result['port'] = request.META["HTTP_X_MOCKATRON_ORIGINAL_HOST"].split(":")[1]
    else:
        result['host'] = request.META["HTTP_HOST"].split(":")[0]
        if 'HTTP_X_FORWARDED_PORT' in request.META:
            result['port'] = request.META["HTTP_X_FORWARDED_PORT"]
        else:
            result['port'] = request.META["SERVER_PORT"]
    result['path'] = request.path
    result['method'] = request.method
    result['content_type'] = request.META["CONTENT_TYPE"]
    if result['content_type'] != None:
        result['content_type'] = result['content_type'].split(";")[0]
    return result

def create_and_return_agent(agent_data):
    agent = Agent(protocol=agent_data['protocol'], host=agent_data['host'], port=agent_data['port'], path=agent_data['path'], method=agent_data['method'], content_type=agent_data['content_type'])
    agent.save()
    if agent.content_type == CONTENT_TYPE_XML:
        try:
            req = urllib.request.Request(agent.wsdl_url())
            content = urllib.request.urlopen(req).read()
            root = ElementTree.fromstring(content.decode(encoding='UTF-8'))
            for operation_wsdl in root.findall('.//{http://schemas.xmlsoap.org/wsdl/}portType/{http://schemas.xmlsoap.org/wsdl/}operation'):

                # Define input message
                input_element = operation_wsdl.find('{http://schemas.xmlsoap.org/wsdl/}input')
                input_element_str = input_element.attrib['message'][input_element.attrib['message'].find(':')+1:]
                input_message_element = root.find('.//{http://schemas.xmlsoap.org/wsdl/}message[@name="' + input_element_str + '"]/{http://schemas.xmlsoap.org/wsdl/}part')
                input_message_element_str = input_message_element.attrib['element'][input_message_element.attrib['element'].find(':')+1:]

                # Define output message
                output_element = operation_wsdl.find('{http://schemas.xmlsoap.org/wsdl/}output')
                if output_element != None:
                    output_element_str = output_element.attrib['message'][output_element.attrib['message'].find(':')+1:]
                    output_message_element = root.find('.//{http://schemas.xmlsoap.org/wsdl/}message[@name="' + output_element_str + '"]/{http://schemas.xmlsoap.org/wsdl/}part')
                    output_message_element_str = output_message_element.attrib['element'][output_message_element.attrib['element'].find(':')+1:]
                else:
                    output_message_element_str = None

                operation = Operation(agent=agent, name=operation_wsdl.attrib['name'], input_message=input_message_element_str, output_message=output_message_element_str)
                operation.save()

                create_default_response(operation)
        except Exception:
            create_default_response(agent)
    else:
        create_default_response(agent)
    return agent

def create_default_response(provider):
    parent_key = re.sub(r'class (.+\.)+', '', re.sub('[\'<>]', '', str(type(provider)))).lower()
    if provider.get_content_type() == CONTENT_TYPE_XML:
        default_label = XML_DEFAULT_LABEL
        default_response = XML_DEFAULT_RESPONSE
    elif provider.get_content_type() == CONTENT_TYPE_JSON:
        default_label = JSON_DEFAULT_LABEL
        default_response = JSON_DEFAULT_RESPONSE
    else:
        default_label = UNKNOWN_DEFAULT_LABEL
        default_response = UNKNOWN_DEFAULT_RESPONSE
    response_args = {parent_key: provider, 'label': default_label, 'content': default_response}
    response = Response(**response_args)
    response.save()

def responder(agent, request):
    logger.debug("Starting responder...")
    response_method = None

    # Evaluate request against Operations, if exists
    logger.debug("Evaluate request against operations to get response method...")
    if agent.operations.count() > 0:
        for operation in agent.operations.all():
            if operation.belongs_to(request):
                response_method = MockResponderFactory.get_mock_responder(operation)
                break

    # Gets response_method based on Agent, if no one Operation matchs request before
    logger.debug("Get response method based on agent, if no one operation matchs request...")
    if response_method == None:
        response_method = MockResponderFactory.get_mock_responder(agent)

    logger.debug("Get response based on mock responder type...")
    response = response_method.get() if isinstance(response_method, SimpleMockResponder) else response_method.get(request)
    context = Context()
    context['request'] = request

    logger.debug("Build response based on agent content type...")
    if request.body != b'':
        body = request.body.decode(encoding='UTF-8')
        if agent.content_type == CONTENT_TYPE_XML:
            context['body'] = xmltodict.parse(body, process_namespaces=True)
        elif agent.content_type == CONTENT_TYPE_JSON:
            context['body'] = json.loads(body)
        else:
            context['body'] = body

    logger.debug("Replies apllying django template...")
    return HttpResponse(response.template().render(context), status=response.http_code, content_type=agent.content_type)

def json_agent_locator(agent_data):
    url = '{}://{}:{}{}'.format(agent_data['protocol'], agent_data['host'], agent_data['port'], agent_data['path'])
    agents = Agent.objects.filter(method=agent_data['method'], protocol=agent_data['protocol'], host=agent_data['host'], port=agent_data['port'])
    path_list = agent_data['path'].split('/')
    while len(path_list) > 1:
        agents_list = agents.filter(path__startswith='/'.join(path_list))
        for a in agents_list:
            if a.match(url):
                return a
        path_list.pop()
    return None
