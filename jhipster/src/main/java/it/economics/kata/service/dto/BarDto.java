package it.economics.kata.service.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
public class BarDto {
    private Map<Integer, List<Long>> depMinusArrOfEveryYear;
}
