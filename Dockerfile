FROM node:6

RUN mkdir /app
WORKDIR /app

ADD . .
COPY ./.env.sample ./.env

VOLUME /app/page

CMD node main.js
