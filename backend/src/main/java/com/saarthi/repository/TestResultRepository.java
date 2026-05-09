package com.saarthi.repository;

import com.saarthi.model.TestResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface TestResultRepository extends JpaRepository<TestResult, Long> {
    List<TestResult> findByUserIdOrderByCreatedAtDesc(Long userId);
    Optional<TestResult> findByAssessmentId(Long assessmentId);
    Optional<TestResult> findTopByUserIdOrderByCreatedAtDesc(Long userId);
}
