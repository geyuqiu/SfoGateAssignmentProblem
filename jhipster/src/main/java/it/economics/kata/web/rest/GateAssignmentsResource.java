package it.economics.kata.web.rest;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import it.economics.kata.domain.GateAssignments;
import it.economics.kata.domain.enumeration.Transaction;
import it.economics.kata.repository.GateAssignmentsRepository;
import it.economics.kata.service.GateAssignmentsService;
import it.economics.kata.service.dto.BarDto;
import it.economics.kata.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link it.economics.kata.domain.GateAssignments}.
 */
@RestController
@RequestMapping("/api")
public class GateAssignmentsResource {

    private final Logger log = LoggerFactory.getLogger(GateAssignmentsResource.class);

    private static final String ENTITY_NAME = "gateAssignments";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GateAssignmentsService gateAssignmentsService;

    private final GateAssignmentsRepository gateAssignmentsRepository;

    public GateAssignmentsResource(GateAssignmentsService gateAssignmentsService, GateAssignmentsRepository gateAssignmentsRepository) {
        this.gateAssignmentsService = gateAssignmentsService;
        this.gateAssignmentsRepository = gateAssignmentsRepository;
    }

    @GetMapping("/gate-assignments/transaction/{transaction}")
    public ResponseEntity<List<GateAssignments>> getGateAssignmentsByTransaction(@PathVariable Transaction transaction, Pageable pageable) {
        log.debug("REST request to get a page of GateAssignments transaction: {}", transaction);
        Page<GateAssignments> page = gateAssignmentsRepository.findByTransaction(transaction, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/gate-assignments/remark/{remark}")
    public ResponseEntity<List<GateAssignments>> getGateAssignmentsByRemark(@PathVariable String remark, Pageable pageable) {
        log.debug("REST request to get a page of GateAssignments remark: {}", remark);
        Page<GateAssignments> page = gateAssignmentsRepository.findByRemarkIgnoreCaseContaining(remark, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/gate-assignments/gate/{gate}")
    public ResponseEntity<List<GateAssignments>> getGateAssignmentsByGate(@PathVariable String gate, Pageable pageable) {
        log.debug("REST request to get a page of GateAssignments gate: {}", gate);
        Page<GateAssignments> page = gateAssignmentsRepository.findByGateIgnoreCaseContaining(gate, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/gate-assignments/terminal/{terminal}")
    public ResponseEntity<List<GateAssignments>> getGateAssignmentsByTerminal(@PathVariable String terminal, Pageable pageable) {
        log.debug("REST request to get a page of GateAssignments terminal: {}", terminal);
        Page<GateAssignments> page = gateAssignmentsRepository.findByTerminalIgnoreCaseContaining(terminal, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/gate-assignments/airline/{airline}")
    public ResponseEntity<List<GateAssignments>> getGateAssignmentsByAirline(@PathVariable String airline, Pageable pageable) {
        log.debug("REST request to get a page of GateAssignments airline: {}", airline);
        Page<GateAssignments> page = gateAssignmentsRepository.findByAirlineIgnoreCaseContaining(airline, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/gate-assignments/flight-number/{flightNumber}")
    public ResponseEntity<List<GateAssignments>> getGateAssignmentsByFlightNumber(@PathVariable String flightNumber, Pageable pageable) {
        log.debug("REST request to get a page of GateAssignments flightNumber: {}", flightNumber);
        Page<GateAssignments> page = gateAssignmentsRepository.findByFlightNumberIgnoreCaseContaining(flightNumber, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }


    // -----

    @GetMapping("/gate-assignments/remark/all/{remark}")
    public ResponseEntity<List<GateAssignments>> getAllGateAssignmentsByRemark(@PathVariable String remark) {
        log.debug("REST request to get all GateAssignments remark: {}", remark);
        List<GateAssignments> gateAssignments = gateAssignmentsRepository.findByRemarkIgnoreCaseContaining(remark);
        return ResponseEntity.ok().body(gateAssignments);
    }

    @GetMapping("/gate-assignments/gate/all/{gate}")
    public ResponseEntity<List<GateAssignments>> getAllGateAssignmentsByGate(@PathVariable String gate) {
        log.debug("REST request to get all GateAssignments gate: {}", gate);
        List<GateAssignments> gateAssignments = gateAssignmentsRepository.findByGateIgnoreCaseContaining(gate);
        return ResponseEntity.ok().body(gateAssignments);
    }

    @GetMapping("/gate-assignments/terminal/all/{terminal}")
    public ResponseEntity<List<GateAssignments>> getAllGateAssignmentsByTerminal(@PathVariable String terminal) {
        log.debug("REST request to get all GateAssignments terminal: {}", terminal);
        List<GateAssignments> gateAssignments = gateAssignmentsRepository.findByTerminalIgnoreCaseContaining(terminal);
        return ResponseEntity.ok().body(gateAssignments);
    }

    @GetMapping("/gate-assignments/airline/all/{airline}")
    public ResponseEntity<List<GateAssignments>> getAllGateAssignmentsByAirline(@PathVariable String airline) {
        log.debug("REST request to get all GateAssignments airline: {}", airline);
        List<GateAssignments> gateAssignments = gateAssignmentsRepository.findByAirlineIgnoreCaseContaining(airline);
        return ResponseEntity.ok().body(gateAssignments);
    }

    @GetMapping("/gate-assignments/flight-number/all/{flightNumber}")
    public ResponseEntity<List<GateAssignments>> getAllGateAssignmentsByFlightNumber(@PathVariable String flightNumber) {
        log.debug("REST request to get all GateAssignments flightNumber: {}", flightNumber);
        List<GateAssignments> gateAssignments = gateAssignmentsRepository.findByFlightNumberIgnoreCaseContaining(flightNumber);
        return ResponseEntity.ok().body(gateAssignments);
    }


    /**
     * {@code POST  /gate-assignments} : Create a new gateAssignments.
     *
     * @param gateAssignments the gateAssignments to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new gateAssignments, or with status {@code 400 (Bad Request)} if the gateAssignments has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/gate-assignments")
    public ResponseEntity<GateAssignments> createGateAssignments(@Valid @RequestBody GateAssignments gateAssignments) throws URISyntaxException {
        log.debug("REST request to save GateAssignments : {}", gateAssignments);
        if (gateAssignments.getId() != null) {
            throw new BadRequestAlertException("A new gateAssignments cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GateAssignments result = gateAssignmentsRepository.save(gateAssignments);
        return ResponseEntity.created(new URI("/api/gate-assignments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getTime().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /gate-assignments} : Updates an existing gateAssignments.
     *
     * @param gateAssignments the gateAssignments to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated gateAssignments,
     * or with status {@code 400 (Bad Request)} if the gateAssignments is not valid,
     * or with status {@code 500 (Internal Server Error)} if the gateAssignments couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/gate-assignments")
    public ResponseEntity<GateAssignments> updateGateAssignments(@Valid @RequestBody GateAssignments gateAssignments) throws URISyntaxException {
        log.debug("REST request to update GateAssignments : {}", gateAssignments);
        if (gateAssignments.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GateAssignments result = gateAssignmentsRepository.save(gateAssignments);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, gateAssignments.getTime().toString()))
            .body(result);
    }

    /**
     * {@code GET  /gate-assignments} : get all the gateAssignments.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of gateAssignments in body.
     */
    @GetMapping("/gate-assignments")
    public ResponseEntity<List<GateAssignments>> getAllGateAssignments(Pageable pageable) {
        log.debug("REST request to get a page of GateAssignments");
        Page<GateAssignments> page = gateAssignmentsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /gate-assignments/:id} : get the "id" gateAssignments.
     *
     * @param id the id of the gateAssignments to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the gateAssignments, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/gate-assignments/{id}")
    public ResponseEntity<GateAssignments> getGateAssignments(@PathVariable Long id) {
        log.debug("REST request to get GateAssignments : {}", id);
        Optional<GateAssignments> gateAssignments = gateAssignmentsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(gateAssignments);
    }

    @GetMapping("/gate-assignments/bar")
    public ResponseEntity<BarDto> getGateAssignmentsBar() {
        log.debug("REST request to get Bar");
        BarDto barDto = gateAssignmentsService.calcBar();
        return ResponseEntity.ok().body(barDto);
    }


    /**
     * {@code DELETE  /gate-assignments/:id} : delete the "id" gateAssignments.
     *
     * @param id the id of the gateAssignments to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/gate-assignments/{id}")
    public ResponseEntity<Void> deleteGateAssignments(@PathVariable Long id) {
        log.debug("REST request to delete GateAssignments : {}", id);
        Optional<GateAssignments> gateAssignments = gateAssignmentsRepository.findById(id);
        if (gateAssignments.isPresent() && gateAssignments.get().getTime() != null) {
            gateAssignmentsRepository.deleteById(id);
            return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName,
                true, ENTITY_NAME,
                gateAssignments.get().getTime().toString())).build();
        } else {
            return ResponseEntity.badRequest()
                .headers(HeaderUtil.createFailureAlert(applicationName, true, ENTITY_NAME, "", "cannot delete: id not available")).build();
        }
    }
}
