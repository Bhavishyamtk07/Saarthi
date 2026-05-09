package com.saarthi.repository;

import com.saarthi.model.Assessment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AssessmentRepository extends JpaRepository<Assessment, Long> {
    List<Assessment> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<Assessment> findByUserIdAndIsCompleted(Long userId, Boolean isCompleted);
    List<Assessment> findByUserIdAndIsDraft(Long userId, Boolean isDraft);
}
