package it.economics.kata.repository;

import it.economics.kata.domain.GateAssignments;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the GateAssignments entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GateAssignmentsRepository extends JpaRepository<GateAssignments, Long> {
}
