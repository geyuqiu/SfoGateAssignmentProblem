package it.economics.kata.repository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class GateAssignmentsRepositoryTest {

    @Autowired
    GateAssignmentsRepository gateAssignmentsRepository;

    @BeforeEach
    void setUp() {
    }

    @Test
    void shouldGetDepArrDiff() {
        // GIVEN
        long diff = gateAssignmentsRepository.getDepArrDiff(
            "1",
            LocalDate.of(2015, 1, 1),
            LocalDate.of(2016, 1, 1)
        );

        // WHEN

        // THEN
        assertThat(diff > 0).isTrue();
        assertThat(diff == 11).isTrue();
    }
}
