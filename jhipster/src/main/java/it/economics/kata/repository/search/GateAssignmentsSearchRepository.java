package it.economics.kata.repository.search;

import it.economics.kata.domain.GateAssignments;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link GateAssignments} entity.
 */
public interface GateAssignmentsSearchRepository extends ElasticsearchRepository<GateAssignments, Long> {
}
