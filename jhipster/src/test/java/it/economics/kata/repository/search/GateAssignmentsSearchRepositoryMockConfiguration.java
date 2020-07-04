package it.economics.kata.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link GateAssignmentsSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class GateAssignmentsSearchRepositoryMockConfiguration {

    @MockBean
    private GateAssignmentsSearchRepository mockGateAssignmentsSearchRepository;

}
