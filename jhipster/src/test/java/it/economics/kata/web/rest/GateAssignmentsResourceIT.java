package it.economics.kata.web.rest;

import it.economics.kata.SfoGateAssignmentProblemApp;
import it.economics.kata.domain.GateAssignments;
import it.economics.kata.domain.enumeration.Transaction;
import it.economics.kata.repository.GateAssignmentsRepository;
import it.economics.kata.service.GateAssignmentsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
/**
 * Integration tests for the {@link GateAssignmentsResource} REST controller.
 */
@SpringBootTest(classes = SfoGateAssignmentProblemApp.class)
@AutoConfigureMockMvc
@WithMockUser
class GateAssignmentsResourceIT {

    private static final Instant DEFAULT_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_AIRLINE = "AAAAAAAAAA";
    private static final String UPDATED_AIRLINE = "BBBBBBBBBB";

    private static final String DEFAULT_FLIGHT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_FLIGHT_NUMBER = "BBBBBBBBBB";

    private static final Transaction DEFAULT_TRANSACTION = Transaction.DEP;
    private static final Transaction UPDATED_TRANSACTION = Transaction.ARR;

    private static final String DEFAULT_TERMINAL = "AAAAAAAAAA";
    private static final String UPDATED_TERMINAL = "BBBBBBBBBB";

    private static final String DEFAULT_GATE = "AAAAAAAAAA";
    private static final String UPDATED_GATE = "BBBBBBBBBB";

    private static final String DEFAULT_REMARK = "AAAAAAAAAA";
    private static final String UPDATED_REMARK = "BBBBBBBBBB";

    @Autowired
    private GateAssignmentsRepository gateAssignmentsRepository;

    @Autowired
    private GateAssignmentsService gateAssignmentsService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGateAssignmentsMockMvc;

    private GateAssignments gateAssignments;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    static GateAssignments createEntity(EntityManager em) {
        GateAssignments gateAssignments = new GateAssignments()
            .time(DEFAULT_TIME)
            .airline(DEFAULT_AIRLINE)
            .flightNumber(DEFAULT_FLIGHT_NUMBER)
            .transaction(DEFAULT_TRANSACTION)
            .terminal(DEFAULT_TERMINAL)
            .gate(DEFAULT_GATE)
            .remark(DEFAULT_REMARK);
        return gateAssignments;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    static GateAssignments createUpdatedEntity(EntityManager em) {
        GateAssignments gateAssignments = new GateAssignments()
            .time(UPDATED_TIME)
            .airline(UPDATED_AIRLINE)
            .flightNumber(UPDATED_FLIGHT_NUMBER)
            .transaction(UPDATED_TRANSACTION)
            .terminal(UPDATED_TERMINAL)
            .gate(UPDATED_GATE)
            .remark(UPDATED_REMARK);
        return gateAssignments;
    }

    @BeforeEach
    void initTest() {
        gateAssignments = createEntity(em);
    }

    @Test
    @Transactional
    void createGateAssignments() throws Exception {
        int databaseSizeBeforeCreate = gateAssignmentsRepository.findAll().size();
        // Create the GateAssignments
        restGateAssignmentsMockMvc.perform(post("/api/gate-assignments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gateAssignments)))
            .andExpect(status().isCreated());

        // Validate the GateAssignments in the database
        List<GateAssignments> gateAssignmentsList = gateAssignmentsRepository.findAll();
        assertThat(gateAssignmentsList).hasSize(databaseSizeBeforeCreate + 1);
        GateAssignments testGateAssignments = gateAssignmentsList.get(gateAssignmentsList.size() - 1);
        assertThat(testGateAssignments.getTime()).isEqualTo(DEFAULT_TIME);
        assertThat(testGateAssignments.getAirline()).isEqualTo(DEFAULT_AIRLINE);
        assertThat(testGateAssignments.getFlightNumber()).isEqualTo(DEFAULT_FLIGHT_NUMBER);
        assertThat(testGateAssignments.getTransaction()).isEqualTo(DEFAULT_TRANSACTION);
        assertThat(testGateAssignments.getTerminal()).isEqualTo(DEFAULT_TERMINAL);
        assertThat(testGateAssignments.getGate()).isEqualTo(DEFAULT_GATE);
        assertThat(testGateAssignments.getRemark()).isEqualTo(DEFAULT_REMARK);
    }

    @Test
    @Transactional
    void createGateAssignmentsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gateAssignmentsRepository.findAll().size();

        // Create the GateAssignments with an existing ID
        gateAssignments.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGateAssignmentsMockMvc.perform(post("/api/gate-assignments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gateAssignments)))
            .andExpect(status().isBadRequest());

        // Validate the GateAssignments in the database
        List<GateAssignments> gateAssignmentsList = gateAssignmentsRepository.findAll();
        assertThat(gateAssignmentsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    void checkTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = gateAssignmentsRepository.findAll().size();
        // set the field null
        gateAssignments.setTime(null);

        // Create the GateAssignments, which fails.


        restGateAssignmentsMockMvc.perform(post("/api/gate-assignments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gateAssignments)))
            .andExpect(status().isBadRequest());

        List<GateAssignments> gateAssignmentsList = gateAssignmentsRepository.findAll();
        assertThat(gateAssignmentsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkAirlineIsRequired() throws Exception {
        int databaseSizeBeforeTest = gateAssignmentsRepository.findAll().size();
        // set the field null
        gateAssignments.setAirline(null);

        // Create the GateAssignments, which fails.


        restGateAssignmentsMockMvc.perform(post("/api/gate-assignments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gateAssignments)))
            .andExpect(status().isBadRequest());

        List<GateAssignments> gateAssignmentsList = gateAssignmentsRepository.findAll();
        assertThat(gateAssignmentsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkFlightNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = gateAssignmentsRepository.findAll().size();
        // set the field null
        gateAssignments.setFlightNumber(null);

        // Create the GateAssignments, which fails.


        restGateAssignmentsMockMvc.perform(post("/api/gate-assignments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gateAssignments)))
            .andExpect(status().isBadRequest());

        List<GateAssignments> gateAssignmentsList = gateAssignmentsRepository.findAll();
        assertThat(gateAssignmentsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkTransactionIsRequired() throws Exception {
        int databaseSizeBeforeTest = gateAssignmentsRepository.findAll().size();
        // set the field null
        gateAssignments.setTransaction(null);

        // Create the GateAssignments, which fails.


        restGateAssignmentsMockMvc.perform(post("/api/gate-assignments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gateAssignments)))
            .andExpect(status().isBadRequest());

        List<GateAssignments> gateAssignmentsList = gateAssignmentsRepository.findAll();
        assertThat(gateAssignmentsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllGateAssignments() throws Exception {
        // Initialize the database
        gateAssignmentsRepository.saveAndFlush(gateAssignments);

        // Get all the gateAssignmentsList
        restGateAssignmentsMockMvc.perform(get("/api/gate-assignments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gateAssignments.getId().intValue())))
            .andExpect(jsonPath("$.[*].time").value(hasItem(DEFAULT_TIME.toString())))
            .andExpect(jsonPath("$.[*].airline").value(hasItem(DEFAULT_AIRLINE)))
            .andExpect(jsonPath("$.[*].flightNumber").value(hasItem(DEFAULT_FLIGHT_NUMBER)))
            .andExpect(jsonPath("$.[*].transaction").value(hasItem(DEFAULT_TRANSACTION.toString())))
            .andExpect(jsonPath("$.[*].terminal").value(hasItem(DEFAULT_TERMINAL)))
            .andExpect(jsonPath("$.[*].gate").value(hasItem(DEFAULT_GATE)))
            .andExpect(jsonPath("$.[*].remark").value(hasItem(DEFAULT_REMARK)));
    }

    @Test
    @Transactional
    void getGateAssignments() throws Exception {
        // Initialize the database
        gateAssignmentsRepository.saveAndFlush(gateAssignments);

        // Get the gateAssignments
        restGateAssignmentsMockMvc.perform(get("/api/gate-assignments/{id}", gateAssignments.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(gateAssignments.getId().intValue()))
            .andExpect(jsonPath("$.time").value(DEFAULT_TIME.toString()))
            .andExpect(jsonPath("$.airline").value(DEFAULT_AIRLINE))
            .andExpect(jsonPath("$.flightNumber").value(DEFAULT_FLIGHT_NUMBER))
            .andExpect(jsonPath("$.transaction").value(DEFAULT_TRANSACTION.toString()))
            .andExpect(jsonPath("$.terminal").value(DEFAULT_TERMINAL))
            .andExpect(jsonPath("$.gate").value(DEFAULT_GATE))
            .andExpect(jsonPath("$.remark").value(DEFAULT_REMARK));
    }
    @Test
    @Transactional
    void getNonExistingGateAssignments() throws Exception {
        // Get the gateAssignments
        restGateAssignmentsMockMvc.perform(get("/api/gate-assignments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void updateGateAssignments() throws Exception {
        // Initialize the database
        gateAssignmentsService.save(gateAssignments);

        int databaseSizeBeforeUpdate = gateAssignmentsRepository.findAll().size();

        // Update the gateAssignments
        GateAssignments updatedGateAssignments = gateAssignmentsRepository.findById(gateAssignments.getId()).get();
        // Disconnect from session so that the updates on updatedGateAssignments are not directly saved in db
        em.detach(updatedGateAssignments);
        updatedGateAssignments
            .time(UPDATED_TIME)
            .airline(UPDATED_AIRLINE)
            .flightNumber(UPDATED_FLIGHT_NUMBER)
            .transaction(UPDATED_TRANSACTION)
            .terminal(UPDATED_TERMINAL)
            .gate(UPDATED_GATE)
            .remark(UPDATED_REMARK);

        restGateAssignmentsMockMvc.perform(put("/api/gate-assignments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedGateAssignments)))
            .andExpect(status().isOk());

        // Validate the GateAssignments in the database
        List<GateAssignments> gateAssignmentsList = gateAssignmentsRepository.findAll();
        assertThat(gateAssignmentsList).hasSize(databaseSizeBeforeUpdate);
        GateAssignments testGateAssignments = gateAssignmentsList.get(gateAssignmentsList.size() - 1);
        assertThat(testGateAssignments.getTime()).isEqualTo(UPDATED_TIME);
        assertThat(testGateAssignments.getAirline()).isEqualTo(UPDATED_AIRLINE);
        assertThat(testGateAssignments.getFlightNumber()).isEqualTo(UPDATED_FLIGHT_NUMBER);
        assertThat(testGateAssignments.getTransaction()).isEqualTo(UPDATED_TRANSACTION);
        assertThat(testGateAssignments.getTerminal()).isEqualTo(UPDATED_TERMINAL);
        assertThat(testGateAssignments.getGate()).isEqualTo(UPDATED_GATE);
        assertThat(testGateAssignments.getRemark()).isEqualTo(UPDATED_REMARK);
    }

    @Test
    @Transactional
    void updateNonExistingGateAssignments() throws Exception {
        int databaseSizeBeforeUpdate = gateAssignmentsRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGateAssignmentsMockMvc.perform(put("/api/gate-assignments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gateAssignments)))
            .andExpect(status().isBadRequest());

        // Validate the GateAssignments in the database
        List<GateAssignments> gateAssignmentsList = gateAssignmentsRepository.findAll();
        assertThat(gateAssignmentsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteGateAssignments() throws Exception {
        // Initialize the database
        gateAssignmentsService.save(gateAssignments);

        int databaseSizeBeforeDelete = gateAssignmentsRepository.findAll().size();

        // Delete the gateAssignments
        restGateAssignmentsMockMvc.perform(delete("/api/gate-assignments/{id}", gateAssignments.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<GateAssignments> gateAssignmentsList = gateAssignmentsRepository.findAll();
        assertThat(gateAssignmentsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
