package com.saarthi.dto;

import lombok.Data;
import java.util.Map;

@Data
public class AssessmentSubmission {
    private String classLevel;
    private Map<Integer, Object> answers; // questionIndex -> answer
    private Integer timeTakenSeconds;
    private Boolean isDraft;
}
