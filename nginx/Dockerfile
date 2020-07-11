# nginx
FROM nginx:stable-alpine

RUN rm -rf /etc/nginx/conf.d
RUN mkdir /etc/nginx/conf.d
COPY ./default.conf /etc/nginx/conf.d/default.conf
# copy build file from client
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]