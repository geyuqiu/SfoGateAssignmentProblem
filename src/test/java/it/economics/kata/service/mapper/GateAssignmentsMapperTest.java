package it.economics.kata.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class GateAssignmentsMapperTest {

    private GateAssignmentsMapper gateAssignmentsMapper;

    @BeforeEach
    public void setUp() {
        gateAssignmentsMapper = new GateAssignmentsMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(gateAssignmentsMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(gateAssignmentsMapper.fromId(null)).isNull();
    }
}
