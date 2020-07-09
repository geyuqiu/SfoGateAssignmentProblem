package it.economics.kata.repository;

import it.economics.kata.domain.GateAssignments;
import it.economics.kata.domain.enumeration.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

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

    @Query(value =
        "SELECT (SELECT count(*) FROM gate_assignments g WHERE g.terminal = :terminal AND g.time >= :firstDayOfThisYear AND g.time < :firstDayOfNextYear AND g.transaction = 'DEP') - (SELECT count(*) FROM gate_assignments g WHERE g.terminal = :terminal AND g.time >= :firstDayOfThisYear AND g.time < :firstDayOfNextYear AND g.transaction = 'ARR') depArrDiff",
        nativeQuery = true
    )
    long getDepArrDiff(@Param("terminal") String terminal,
                       @Param("firstDayOfThisYear") LocalDate firstDayOfThisYear,
                       @Param("firstDayOfNextYear") LocalDate firstDayOfNextYear
    );

    List<GateAssignments> findByAirlineIgnoreCaseContaining(String airline);

    List<GateAssignments> findByFlightNumberIgnoreCaseContaining(String flightNumber);

    List<GateAssignments> findByTerminalIgnoreCaseContaining(String terminal);

    List<GateAssignments> findByGateIgnoreCaseContaining(String gate);

    List<GateAssignments> findByRemarkIgnoreCaseContaining(String remark);
}
