FROM node:16-alpine

WORKDIR /app

COPY ./front-fullstack-afiliados/package.json /app

RUN yarn

COPY ./front-fullstack-afiliados /app

EXPOSE 3333

CMD [ "yarn","dev" ]
