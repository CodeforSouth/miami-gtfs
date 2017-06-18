FROM node:8-alpine

RUN apk add --no-cache openssl

ENV HOME=/home/app

ENV DOCKERIZE_VERSION v0.5.0
RUN mkdir $HOME \
  && wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && npm install nodemon babel-cli knex -g
