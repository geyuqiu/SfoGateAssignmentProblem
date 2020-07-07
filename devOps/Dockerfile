FROM postgres:12.3
ENV POSTGRES_DB SfoGateAssignmentProblem
COPY csv /tmp
COPY init.sql /docker-entrypoint-initdb.d/

# docker build -t psql-yuqiu .

# run this dockerfile via docker run
# docker run -e POSTGRES_PASSWORD=password psql-yuqiu
