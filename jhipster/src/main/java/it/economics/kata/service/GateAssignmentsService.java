package it.economics.kata.service;

import it.economics.kata.domain.GateAssignments;
import it.economics.kata.repository.GateAssignmentsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link GateAssignments}.
 */
@Service
@Transactional
public class GateAssignmentsService {

    private final Logger log = LoggerFactory.getLogger(GateAssignmentsService.class);

    private final GateAssignmentsRepository gateAssignmentsRepository;

    public GateAssignmentsService(GateAssignmentsRepository gateAssignmentsRepository) {
        this.gateAssignmentsRepository = gateAssignmentsRepository;
    }
}
