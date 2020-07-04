package it.economics.kata.service;

import it.economics.kata.domain.GateAssignments;
import it.economics.kata.repository.GateAssignmentsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

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

    /**
     * Save a gateAssignments.
     *
     * @param gateAssignments the entity to save.
     * @return the persisted entity.
     */
    public GateAssignments save(GateAssignments gateAssignments) {
        log.debug("Request to save GateAssignments : {}", gateAssignments);
        return gateAssignmentsRepository.save(gateAssignments);
    }

    /**
     * Get all the gateAssignments.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<GateAssignments> findAll(Pageable pageable) {
        log.debug("Request to get all GateAssignments");
        return gateAssignmentsRepository.findAll(pageable);
    }


    /**
     * Get one gateAssignments by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<GateAssignments> findOne(Long id) {
        log.debug("Request to get GateAssignments : {}", id);
        return gateAssignmentsRepository.findById(id);
    }

    /**
     * Delete the gateAssignments by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete GateAssignments : {}", id);
        gateAssignmentsRepository.deleteById(id);
    }
}
