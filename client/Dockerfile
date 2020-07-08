# client
FROM node:12.18.2 as build

WORKDIR /usr/src/app

COPY . .
RUN npm install
RUN npm run build

FROM nginx:stable-alpine

RUN rm -rf /etc/nginx/conf.d
RUN mkdir /etc/nginx/conf.d
COPY conf/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]