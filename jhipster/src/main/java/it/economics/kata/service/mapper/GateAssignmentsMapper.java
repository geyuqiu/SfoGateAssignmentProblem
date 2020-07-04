package it.economics.kata.service.mapper;


import it.economics.kata.domain.*;
import it.economics.kata.service.dto.GateAssignmentsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link GateAssignments} and its DTO {@link GateAssignmentsDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface GateAssignmentsMapper extends EntityMapper<GateAssignmentsDTO, GateAssignments> {



    default GateAssignments fromId(Long id) {
        if (id == null) {
            return null;
        }
        GateAssignments gateAssignments = new GateAssignments();
        gateAssignments.setId(id);
        return gateAssignments;
    }
}
