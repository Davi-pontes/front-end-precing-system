FROM node:lts-alpine AS build-stage

ARG VITE_API_BACKEND

ENV VITE_API_BACKEND=$VITE_API_BACKEND

RUN npm install -g vite

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine AS production-stage

RUN rm -rf /usr/share/nginx/html/*

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
