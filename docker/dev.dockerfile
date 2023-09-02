FROM node:16-alpine

WORKDIR /app

COPY ./api-fullstack-afiliados /app

RUN npm install

EXPOSE 3333

CMD [ "npm","run","start:dev" ]
