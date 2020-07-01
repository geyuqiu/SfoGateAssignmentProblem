package it.economics.kata.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import it.economics.kata.web.rest.TestUtil;

public class GateAssignmentsDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GateAssignmentsDTO.class);
        GateAssignmentsDTO gateAssignmentsDTO1 = new GateAssignmentsDTO();
        gateAssignmentsDTO1.setId(1L);
        GateAssignmentsDTO gateAssignmentsDTO2 = new GateAssignmentsDTO();
        assertThat(gateAssignmentsDTO1).isNotEqualTo(gateAssignmentsDTO2);
        gateAssignmentsDTO2.setId(gateAssignmentsDTO1.getId());
        assertThat(gateAssignmentsDTO1).isEqualTo(gateAssignmentsDTO2);
        gateAssignmentsDTO2.setId(2L);
        assertThat(gateAssignmentsDTO1).isNotEqualTo(gateAssignmentsDTO2);
        gateAssignmentsDTO1.setId(null);
        assertThat(gateAssignmentsDTO1).isNotEqualTo(gateAssignmentsDTO2);
    }
}
