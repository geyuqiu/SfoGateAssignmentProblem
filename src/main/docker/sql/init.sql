DROP TABLE if EXISTS gate_assignments;

CREATE TABLE gate_assignments (id bigserial NOT NULL, time TIMESTAMP NOT NULL, airline VARCHAR(255) NOT NULL, flight_number VARCHAR(255) NOT NULL, transaction VARCHAR(255) NOT NULL, terminal VARCHAR(255), gate VARCHAR(255), remark VARCHAR(255), CONSTRAINT PK_GATE_ASSIGNMENTS PRIMARY KEY (id));

INSERT INTO gate_assignments (time, airline, flight_number, transaction, terminal, gate, remark) VALUES ('2015-01-01 00:00:00', 'United Airlines', 'UA263', 'ARR', '3', '75', '');
