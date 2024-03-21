# base image
FROM ubuntu:focal as runner 

WORKDIR /app


RUN apt-get update && \
    apt-get upgrade

RUN apt-get install -y curl

COPY . /app


ENTRYPOINT ["main.sh"]

CMD ["--help"]