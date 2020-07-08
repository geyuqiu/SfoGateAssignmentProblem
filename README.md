# 1. Assignment

sorry I am not a data scientist, so I just tried to do this via excel...

## Insights got while exploring the data with excel:

- In general:
  - United Airlines flights makes up about 50% of all the flights overall, followed by other american based airlines
  - most flights do not have remark \* number of ingoing vs outgoing flights is about 1:1
  - remark field is optional, but gate and terminal can be null
- Terminal:
  - \#DEP vs #APP
    - at Terminal I (International) #DEP are smaller than #ARR every year
    - at Terminal 3, apart from 2017, #DEP are always bigger than #ARR every year
  - terminal 1 mostly consists of gates that begin with a number
  - Inside Terminal 1, only Flights of USA based airlines depart / arrive
  - Terminal 3 is the most busiest terminal with the largest number of flights
- Layover \* for certain airlines that flies to a far away destination, e.g. Air China there is certain routine
  - there is a flight to a chinese and from a chinese destination every day
  - CA985 is e.g. always the departing flight
  - CA986 is e.g. always the arriving flight
  - the layover time between CA986 and CA986 is around 2 hours for maintenance and refuelling (the layover time is different e.g. around 15 hours for Japan Airlines JL1 and JL2)
- Remarks and transaction
  _ Only a departing flight can have following remarks: Returning, See agent, Returned, Last Call, Departed, Closed, Boarding
  _ Only a arriving flight can have following remarks: In range, Arrived

## Gate Assignment

- for a certain flight number (e.g. AA1009 from American Airlines), only departs at SFO and at gates: 56, 57 to 58 (gates always begin with number 5x)
- flights of a certain airline (e.g. Air China), always departs / arrives e.g. at gates that start with Gx
- certain gate number are used as "arrival gate" (more arrival than departure, e.g. RA18)

## Advice to operation management team:

- the layover time of a flight (after arrival) variies from time to time, so be fast and efficient as possible during the time period!


# 2. Assignment

# Run the application locally (tested on MacOS Catalina MacBook 2016 15')
    
    # install docker
    docker --version
    # Docker version 19.03.8, build afacb8b

    # clone the project
    git clone git@github.com:geyuqiu/SfoGateAssignmentProblem.git
    # switch dir
    cd SfoGateAssignmentProblem/devOps
    pwd
    
    # following commands stops and delete all docker containers and images! 
    docker system prune --volumes
    # Stop all containers
    docker stop $(docker ps -a -q)
    # Delete all containers
    docker rm $(docker ps -a -q)
    # Delete all images
    docker rmi $(docker images -q)
    
    # db will be loading millions of entries
    docker-compose -f postgresql.yml up
    
    # if you see 
    # ...
    # sfogateassignmentproblem-postgresql_1  | 2020-07-07 19:31:40.191 UTC [1] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
    # sfogateassignmentproblem-postgresql_1  | 2020-07-07 19:31:40.221 UTC [1] LOG:  database system is ready to accept connections
    # then just type
    ctrl+c
    # to exit
    
    # run the app and db together via 1 line command 
    docker-compose -f sfo-app.yml up
   
    # find the url in console and login with admin (username) admin (password), if you see the server is ready (by displaying localhost... )

# Tech Stack and Links

- issues: https://github.com/geyuqiu/SfoGateAssignmentProblem/issues
- JHipster
- Sprint Boot
- Angular
- Docker: https://hub.docker.com/repository/docker/yuqiuge/sfo-gate-assignment-problem/tags
- Postgres
- Github actions: https://github.com/geyuqiu/SfoGateAssignmentProblem/actions
- Cypress
    - crud: https://youtu.be/gRv1o3m5lR0 (may need VPN)
    - barchart: https://youtu.be/wXQk33RPQ1w
    - https://dashboard.cypress.io/projects/kzyhqj/runs/6/test-results/b1e6ce92-a7ec-4482-ae7b-be2396a166b3 (may not be accessible)
- Sonar: https://sonarcloud.io/dashboard?id=geyuqiu_SfoGateAssignmentProblem
- Primeng Chart: https://www.primefaces.org/primeng/showcase/#/chart
- Primeng responsive Table: https://www.primefaces.org/primeng/showcase/#/table
- Primeng Slider: https://www.primefaces.org/primeng/showcase/#/slider

