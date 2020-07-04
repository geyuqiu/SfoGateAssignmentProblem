package it.economics.kata.service.dto;

import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import it.economics.kata.domain.enumeration.Transaction;

/**
 * A DTO for the {@link it.economics.kata.domain.GateAssignments} entity.
 */
public class GateAssignmentsDTO implements Serializable {
    
    private Long id;

    @NotNull
    private Instant time;

    @NotNull
    private String airline;

    @NotNull
    private String flightNumber;

    @NotNull
    private Transaction transaction;

    private String terminal;

    private String gate;

    private String remark;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getTime() {
        return time;
    }

    public void setTime(Instant time) {
        this.time = time;
    }

    public String getAirline() {
        return airline;
    }

    public void setAirline(String airline) {
        this.airline = airline;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public Transaction getTransaction() {
        return transaction;
    }

    public void setTransaction(Transaction transaction) {
        this.transaction = transaction;
    }

    public String getTerminal() {
        return terminal;
    }

    public void setTerminal(String terminal) {
        this.terminal = terminal;
    }

    public String getGate() {
        return gate;
    }

    public void setGate(String gate) {
        this.gate = gate;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GateAssignmentsDTO)) {
            return false;
        }

        return id != null && id.equals(((GateAssignmentsDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "GateAssignmentsDTO{" +
            "id=" + getId() +
            ", time='" + getTime() + "'" +
            ", airline='" + getAirline() + "'" +
            ", flightNumber='" + getFlightNumber() + "'" +
            ", transaction='" + getTransaction() + "'" +
            ", terminal='" + getTerminal() + "'" +
            ", gate='" + getGate() + "'" +
            ", remark='" + getRemark() + "'" +
            "}";
    }
}
