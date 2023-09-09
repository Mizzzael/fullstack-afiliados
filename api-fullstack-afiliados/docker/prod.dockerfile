FROM node:16-alpine

WORKDIR /app

COPY ./api-fullstack-afiliados/package.json /app

RUN yarn

COPY ./api-fullstack-afiliados /app

EXPOSE 3333

CMD [ "yarn","start:dev" ]
