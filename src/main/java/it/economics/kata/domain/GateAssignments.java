package it.economics.kata.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.Instant;

import it.economics.kata.domain.enumeration.Transaction;

/**
 * A GateAssignments.
 */
@Entity
@Table(name = "gate_assignments")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "gateassignments")
public class GateAssignments implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "time")
    private Instant time;

    @Column(name = "airline")
    private String airline;

    @Column(name = "flight_number")
    private String flightNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "transaction")
    private Transaction transaction;

    @Column(name = "terminal")
    private String terminal;

    @Column(name = "gate")
    private String gate;

    @Column(name = "remark")
    private String remark;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getTime() {
        return time;
    }

    public GateAssignments time(Instant time) {
        this.time = time;
        return this;
    }

    public void setTime(Instant time) {
        this.time = time;
    }

    public String getAirline() {
        return airline;
    }

    public GateAssignments airline(String airline) {
        this.airline = airline;
        return this;
    }

    public void setAirline(String airline) {
        this.airline = airline;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public GateAssignments flightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
        return this;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public Transaction getTransaction() {
        return transaction;
    }

    public GateAssignments transaction(Transaction transaction) {
        this.transaction = transaction;
        return this;
    }

    public void setTransaction(Transaction transaction) {
        this.transaction = transaction;
    }

    public String getTerminal() {
        return terminal;
    }

    public GateAssignments terminal(String terminal) {
        this.terminal = terminal;
        return this;
    }

    public void setTerminal(String terminal) {
        this.terminal = terminal;
    }

    public String getGate() {
        return gate;
    }

    public GateAssignments gate(String gate) {
        this.gate = gate;
        return this;
    }

    public void setGate(String gate) {
        this.gate = gate;
    }

    public String getRemark() {
        return remark;
    }

    public GateAssignments remark(String remark) {
        this.remark = remark;
        return this;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GateAssignments)) {
            return false;
        }
        return id != null && id.equals(((GateAssignments) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "GateAssignments{" +
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
