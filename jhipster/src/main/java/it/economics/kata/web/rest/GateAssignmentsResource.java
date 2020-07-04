package it.economics.kata.web.rest;

import it.economics.kata.domain.GateAssignments;
import it.economics.kata.service.GateAssignmentsService;
import it.economics.kata.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    public GateAssignmentsResource(GateAssignmentsService gateAssignmentsService) {
        this.gateAssignmentsService = gateAssignmentsService;
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
        GateAssignments result = gateAssignmentsService.save(gateAssignments);
        return ResponseEntity.created(new URI("/api/gate-assignments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
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
        GateAssignments result = gateAssignmentsService.save(gateAssignments);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, gateAssignments.getId().toString()))
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
        Page<GateAssignments> page = gateAssignmentsService.findAll(pageable);
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
        Optional<GateAssignments> gateAssignments = gateAssignmentsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gateAssignments);
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
        gateAssignmentsService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
