FROM node:lts-alpine

RUN npm install -g http-server

RUN npm install -g vite

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm","run","dev" ]
