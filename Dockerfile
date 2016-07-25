FROM python:3-onbuild

MAINTAINER Rodrigo Zampieri Castilho <rodrigo.zampieri@gmail.com>

ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code/
RUN pip install -r requirements.txt
ADD . /code/
