# Choices for Models
SIMPLE_MOCK_RESPONDER = ('SIMPLE_MOCK_RESPONDER', 'Simple Mock Responder')
FILTER_MOCK_RESPONDER = ('FILTER_MOCK_RESPONDER', 'Filter Mock Responder')

MOCK_RESPONDERS = (
    SIMPLE_MOCK_RESPONDER,
    FILTER_MOCK_RESPONDER
)

HTTP_CODES = (
    (200, '(200) OK'),
    (500, '(500) Internal Server Error'),
    (100, '(100) Continue'),
    (101, '(101) Switching Protocols'),
    (201, '(201) Created'),
    (202, '(202) Accepted'),
    (203, '(203) Non-Authoritative Information'),
    (204, '(204) No Content'),
    (205, '(205) Reset Content'),
    (206, '(206) Partial Content'),
    (300, '(300) Multiple Choices'),
    (301, '(301) Moved Permanently'),
    (302, '(302) Found'),
    (303, '(303) See Other'),
    (304, '(304) Not Modified'),
    (305, '(305) Use Proxy'),
    (306, '(306) (Unused)'),
    (307, '(307) Temporary Redirect'),
    (400, '(400) Bad Request'),
    (401, '(401) Unauthorized'),
    (402, '(402) Payment Required'),
    (403, '(403) Forbidden'),
    (404, '(404) Not Found'),
    (405, '(405) Method Not Allowed'),
    (406, '(406) Not Acceptable'),
    (407, '(407) Proxy Authentication Required'),
    (408, '(408) Request Timeout'),
    (409, '(409) Conflict'),
    (410, '(410) Gone'),
    (411, '(411) Length Required'),
    (412, '(412) Precondition Failed'),
    (413, '(413) Request Entity Too Large'),
    (414, '(414) Request-URI Too Long'),
    (415, '(415) Unsupported Media Type'),
    (416, '(416) Requested Range Not Satisfiable'),
    (417, '(417) Expectation Failed'),
    (501, '(501) Not Implemented'),
    (502, '(502) Bad Gateway'),
    (503, '(503) Service Unavailable'),
    (504, '(504) Gateway Timeout'),
    (505, '(505) HTTP Version Not Supported')
)

REQUEST_FIELD_TYPES = (
    ('CONTENT', 'Content'),
    ('HEADER', 'HTTP Header'),
    ('QUERY_PARAM', 'Query Parameter')
)

RESPONSE_FIELD_TYPES = (
    ('LABEL', 'Label'),
    ('HTTP_CODE', 'HTTP Code')
)

OPERATORS = (
    ('EQUALS', 'Equals'),
    ('CONTAINS', 'Contains'),
    ('STARTS_WITH', 'Starts With'),
    ('ENDS_WITH', 'Ends With'),
    ('REGEX', 'Regular Expression')
)

# Default Responses
XML_DEFAULT_LABEL='XML Default Response'
XML_DEFAULT_RESPONSE="""<mockatron>
    <code>0</code>
    <description>{}</description>
</mockatron>""".format(XML_DEFAULT_LABEL)

JSON_DEFAULT_LABEL='JSON Default Response'
JSON_DEFAULT_RESPONSE="""{{
    "mockatron": {{
        "code": "0",
        "description": "{}"
    }}
}}""".format(JSON_DEFAULT_LABEL)

UNKNOWN_DEFAULT_LABEL='UNKNOWN Default Response'
UNKNOWN_DEFAULT_RESPONSE='mockatron - code: 0 - description: {}'.format(UNKNOWN_DEFAULT_LABEL)
