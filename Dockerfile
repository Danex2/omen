FROM node:12.19.0-alpine3.10

WORKDIR /app

ADD package.json yarn.lock ./

RUN yarn

ADD . .

CMD yarn dev