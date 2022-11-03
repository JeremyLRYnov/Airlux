FROM mysql:latest
ENV MYSQL_ROOT_PASSWORD=123456
ENV MYSQL_DATABASE=distantDB

ADD ./mysql/data /var/lib/mysql
WORKDIR /mysql/data

EXPOSE 3306
VOLUME /var/lib/mysql
