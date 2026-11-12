FROM postgres:latest

COPY admin.sql /docker-entrypoint-initdb.d/
COPY productos.sql /docker-entrypoint-initdb.d/

EXPOSE 5432
