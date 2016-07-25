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
