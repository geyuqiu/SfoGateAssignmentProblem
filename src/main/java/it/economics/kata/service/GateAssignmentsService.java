package it.economics.kata.service;

import it.economics.kata.domain.GateAssignments;
import it.economics.kata.repository.GateAssignmentsRepository;
import it.economics.kata.repository.search.GateAssignmentsSearchRepository;
import it.economics.kata.service.dto.GateAssignmentsDTO;
import it.economics.kata.service.mapper.GateAssignmentsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link GateAssignments}.
 */
@Service
@Transactional
public class GateAssignmentsService {

    private final Logger log = LoggerFactory.getLogger(GateAssignmentsService.class);

    private final GateAssignmentsRepository gateAssignmentsRepository;

    private final GateAssignmentsMapper gateAssignmentsMapper;

    private final GateAssignmentsSearchRepository gateAssignmentsSearchRepository;

    public GateAssignmentsService(GateAssignmentsRepository gateAssignmentsRepository, GateAssignmentsMapper gateAssignmentsMapper, GateAssignmentsSearchRepository gateAssignmentsSearchRepository) {
        this.gateAssignmentsRepository = gateAssignmentsRepository;
        this.gateAssignmentsMapper = gateAssignmentsMapper;
        this.gateAssignmentsSearchRepository = gateAssignmentsSearchRepository;
    }

    /**
     * Save a gateAssignments.
     *
     * @param gateAssignmentsDTO the entity to save.
     * @return the persisted entity.
     */
    public GateAssignmentsDTO save(GateAssignmentsDTO gateAssignmentsDTO) {
        log.debug("Request to save GateAssignments : {}", gateAssignmentsDTO);
        GateAssignments gateAssignments = gateAssignmentsMapper.toEntity(gateAssignmentsDTO);
        gateAssignments = gateAssignmentsRepository.save(gateAssignments);
        GateAssignmentsDTO result = gateAssignmentsMapper.toDto(gateAssignments);
        gateAssignmentsSearchRepository.save(gateAssignments);
        return result;
    }

    /**
     * Get all the gateAssignments.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<GateAssignmentsDTO> findAll(Pageable pageable) {
        log.debug("Request to get all GateAssignments");
        return gateAssignmentsRepository.findAll(pageable)
            .map(gateAssignmentsMapper::toDto);
    }


    /**
     * Get one gateAssignments by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<GateAssignmentsDTO> findOne(Long id) {
        log.debug("Request to get GateAssignments : {}", id);
        return gateAssignmentsRepository.findById(id)
            .map(gateAssignmentsMapper::toDto);
    }

    /**
     * Delete the gateAssignments by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete GateAssignments : {}", id);
        gateAssignmentsRepository.deleteById(id);
        gateAssignmentsSearchRepository.deleteById(id);
    }

    /**
     * Search for the gateAssignments corresponding to the query.
     *
     * @param query the query of the search.
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<GateAssignmentsDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of GateAssignments for query {}", query);
        return gateAssignmentsSearchRepository.search(queryStringQuery(query), pageable)
            .map(gateAssignmentsMapper::toDto);
    }
}
