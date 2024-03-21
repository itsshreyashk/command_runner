FROM node:alpine as builder


WORKDIR /app

COPY package*.json ./
RUN npm install

COPY src src


FROM ubuntu:focal as runner
ARG DEBIAN_FRONTEND=noninteractive

WORKDIR /app
COPY --from=builder /app .

RUN apt-get update && apt install -y nodejs npm

ENV PORT=3000
EXPOSE 3000
CMD ["npm", "start"]