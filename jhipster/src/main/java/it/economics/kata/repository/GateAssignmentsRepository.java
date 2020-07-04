package it.economics.kata.repository;

import it.economics.kata.domain.GateAssignments;
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
  Page<GateAssignments> findByAirline(String airline, Pageable pageable);
}
