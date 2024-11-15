FROM node:latest as build_static_stage
WORKDIR /src
COPY . /src
RUN npm install
RUN npm run build

FROM nginx:alpine

WORKDIR /var/www/html
COPY --from=build_static_stage /src /var/www/html
ADD ./docker/nginx/conf.d/prod.conf /etc/nginx/conf.d/default.conf
