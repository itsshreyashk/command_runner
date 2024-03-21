# base image
FROM ubuntu:focal as builder

WORKDIR /app


RUN apt-get update && \
    apt-get upgrade && \
    apt-get install g++

COPY . .

RUN g++ -o main main.cpp

FROM ubuntu:focal as runner

WORKDIR /app

COPY --from=builder /app/main .
RUN apt-get update && \
    apt-get install -y curl

ENTRYPOINT ["main"]

CMD ["--help"]