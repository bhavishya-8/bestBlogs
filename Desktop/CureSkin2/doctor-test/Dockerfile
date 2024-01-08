FROM healloinc/base-image:ubuntu-22.04
COPY ./client/ /usr/share/nginx/html
RUN apt update && apt install nginx -y
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]