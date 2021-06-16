FROM node:14-alpine

ENV PORT 8080

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

CMD [ "yarn", "dev" ]
