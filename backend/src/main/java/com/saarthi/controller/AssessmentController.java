package com.saarthi.controller;

import com.saarthi.dto.AssessmentSubmission;
import com.saarthi.model.Assessment;
import com.saarthi.model.TestResult;
import com.saarthi.model.User;
import com.saarthi.repository.UserRepository;
import com.saarthi.service.AssessmentService;
import com.saarthi.util.MapUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/assessment")
@RequiredArgsConstructor
public class AssessmentController {

    private final AssessmentService assessmentService;
    private final UserRepository userRepository;

    @PostMapping("/submit")
    public ResponseEntity<?> submitAssessment(@RequestBody AssessmentSubmission submission,
                                               Authentication auth) {
        try {
            User user = getUser(auth);
            Assessment assessment = assessmentService.submitAssessment(user.getId(), submission);
            Map<String, Object> result = new HashMap<>();
            result.put("message", "Assessment submitted successfully");
            result.put("assessmentId", assessment.getId());
            result.put("isCompleted", assessment.getIsCompleted());
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(MapUtil.of("error", e.getMessage()));
        }
    }

    @GetMapping("/history")
    public ResponseEntity<?> getHistory(Authentication auth) {
        User user = getUser(auth);
        List<Assessment> assessments = assessmentService.getUserAssessments(user.getId());
        return ResponseEntity.ok(assessments);
    }

    @GetMapping("/results/latest")
    public ResponseEntity<?> getLatestResult(Authentication auth) {
        try {
            User user = getUser(auth);
            TestResult result = assessmentService.getLatestResult(user.getId());
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(MapUtil.of("error", e.getMessage()));
        }
    }

    @GetMapping("/results")
    public ResponseEntity<?> getAllResults(Authentication auth) {
        User user = getUser(auth);
        List<TestResult> results = assessmentService.getAllResults(user.getId());
        return ResponseEntity.ok(results);
    }

    private User getUser(Authentication auth) {
        return userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
