package it.economics.kata.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import it.economics.kata.web.rest.TestUtil;

public class GateAssignmentsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GateAssignments.class);
        GateAssignments gateAssignments1 = new GateAssignments();
        gateAssignments1.setId(1L);
        GateAssignments gateAssignments2 = new GateAssignments();
        gateAssignments2.setId(gateAssignments1.getId());
        assertThat(gateAssignments1).isEqualTo(gateAssignments2);
        gateAssignments2.setId(2L);
        assertThat(gateAssignments1).isNotEqualTo(gateAssignments2);
        gateAssignments1.setId(null);
        assertThat(gateAssignments1).isNotEqualTo(gateAssignments2);
    }
}
