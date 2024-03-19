# base image
FROM ubuntu:focal as runner 

WORKDIR /app


RUN apt-get update
RUN apt-get upgrade

RUN apt-get install -y curl

RUN apt-get install -y nodejs

COPY . /app
