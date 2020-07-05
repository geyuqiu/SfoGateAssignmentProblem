package it.economics.kata.service;

import it.economics.kata.repository.GateAssignmentsRepository;
import it.economics.kata.service.dto.BarDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
class GateAssignmentsServiceTest {

    @Autowired
    GateAssignmentsRepository gateAssignmentsRepository;

    GateAssignmentsService sut;

    @BeforeEach
    void setUp() {
        sut = new GateAssignmentsService(gateAssignmentsRepository);
    }

    @Test
    void testCalcBar() {
        BarDto barDto = sut.calcBar();
        for (Map.Entry<Integer, List<Long>> entry : barDto.getDepMinusArrOfEveryYear().entrySet()) {
            assertEquals(4, entry.getValue().size());
        }
    }
}
