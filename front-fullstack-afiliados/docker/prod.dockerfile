FROM node:16-alpine

WORKDIR /app

COPY ./front-fullstack-afiliados /app

RUN yarn

RUN yarn build

EXPOSE 3333

CMD [ "yarn","start" ]
