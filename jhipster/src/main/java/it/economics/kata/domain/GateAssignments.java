package it.economics.kata.domain;

import it.economics.kata.domain.enumeration.Transaction;
import lombok.Data;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;

/**
 * A GateAssignments.
 */
@Entity
@Table(name = "gate_assignments")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@Data
public class GateAssignments implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "time", nullable = false)
    private Instant time;

    @NotNull
    @Column(name = "airline", nullable = false)
    private String airline;

    @NotNull
    @Column(name = "flight_number", nullable = false)
    private String flightNumber;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "transaction", nullable = false)
    private Transaction transaction;

    @Column(name = "terminal")
    private String terminal;

    @Column(name = "gate")
    private String gate;

    @Column(name = "remark")
    private String remark;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public GateAssignments time(Instant time) {
        this.time = time;
        return this;
    }

    public GateAssignments airline(String airline) {
        this.airline = airline;
        return this;
    }

    public GateAssignments flightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
        return this;
    }

    public GateAssignments transaction(Transaction transaction) {
        this.transaction = transaction;
        return this;
    }

    public GateAssignments terminal(String terminal) {
        this.terminal = terminal;
        return this;
    }

    public GateAssignments gate(String gate) {
        this.gate = gate;
        return this;
    }

    public GateAssignments remark(String remark) {
        this.remark = remark;
        return this;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here
}
