package it.economics.kata.service;

import it.economics.kata.domain.GateAssignments;
import it.economics.kata.repository.GateAssignmentsRepository;
import it.economics.kata.service.dto.BarDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Service Implementation for managing {@link GateAssignments}.
 */
@Service
@Transactional
public class GateAssignmentsService {

    private final GateAssignmentsRepository gateAssignmentsRepository;

    private final int[] years = {2015, 2016, 2017, 2018, 2019};
    private final String[] terminals = {"1", "2", "3", "I"};

    public GateAssignmentsService(GateAssignmentsRepository gateAssignmentsRepository) {
        this.gateAssignmentsRepository = gateAssignmentsRepository;
    }

    public BarDto calcBar() {
        BarDto barDto = new BarDto();

        Map<Integer, List<Long>> depMinusArrOfEveryYear = new HashMap<>(4);
        for (int year : years) {
            List<Long> diffs = new ArrayList<>();
            for (String terminal : terminals) {
                long diff = gateAssignmentsRepository.getDepArrDiff(
                    terminal,
                    LocalDate.of(year, 1, 1),
                    LocalDate.of(year + 1, 1, 1)
                );
                diffs.add(diff);
            }
            depMinusArrOfEveryYear.put(year, diffs);
        }

        barDto.setDepMinusArrOfEveryYear(depMinusArrOfEveryYear);

        return barDto;
    }
}
