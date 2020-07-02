DROP TABLE if EXISTS gate_assignments;

CREATE TABLE gate_assignments (id BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL, time TIMESTAMP WITHOUT TIME ZONE NOT NULL, airline VARCHAR(255) NOT NULL, flight_number VARCHAR(255) NOT NULL, transaction VARCHAR(255) NOT NULL, terminal VARCHAR(255), gate VARCHAR(255), remark VARCHAR(255), CONSTRAINT PK_GATE_ASSIGNMENTS PRIMARY KEY (id));

-- INSERT INTO gate_assignments (time, airline, flight_number, transaction, terminal, gate, remark) VALUES ('2015-01-01T00:00:00', 'United Airlines', 'UA263', 'ARR', '3', '75', '');

-- https://www.postgresql.org/docs/9.2/sql-copy.html
\copy gate_assignments (time, airline, flight_number, transaction, terminal, gate, remark) FROM '/tmp/gate_assignments.csv' DELIMITER ';' CSV HEADER;

SELECT * FROM gate_assignments;

-- https://stackoverflow.com/questions/34688465/how-do-i-run-a-sql-file-of-inserts-through-docker-run
