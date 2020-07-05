package it.economics.kata.repository;

import it.economics.kata.domain.GateAssignments;
import it.economics.kata.domain.enumeration.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the GateAssignments entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GateAssignmentsRepository extends JpaRepository<GateAssignments, Long> {
    Page<GateAssignments> findByAirlineIgnoreCaseContaining(String airline, Pageable pageable);

    Page<GateAssignments> findByFlightNumberIgnoreCaseContaining(String flightNumber, Pageable pageable);

    Page<GateAssignments> findByTerminalIgnoreCaseContaining(String terminal, Pageable pageable);

    Page<GateAssignments> findByGateIgnoreCaseContaining(String gate, Pageable pageable);

    Page<GateAssignments> findByRemarkIgnoreCaseContaining(String remark, Pageable pageable);

    Page<GateAssignments> findByTransaction(Transaction transaction, Pageable pageable);
//    Page<GateAssignments> findByTime(Instant time, Pageable pageable);
}
