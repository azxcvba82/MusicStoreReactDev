ARG APP_HOME=/home/node/app

# build stage
FROM node:14.17 as build
WORKDIR ${APP_HOME}

COPY ./frontend ${APP_HOME}
RUN yarn install
RUN yarn build

# deploy stage
FROM nginx:alpine
COPY --from=build ${APP_HOME}/build /var/www
COPY ./frontend/nginx /etc/nginx/conf.d/

WORKDIR /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]