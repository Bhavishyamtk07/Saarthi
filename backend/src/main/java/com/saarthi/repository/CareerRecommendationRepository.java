package com.saarthi.repository;

import com.saarthi.model.CareerRecommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CareerRecommendationRepository extends JpaRepository<CareerRecommendation, Long> {
    List<CareerRecommendation> findByUserIdOrderByMatchPercentageDesc(Long userId);
    List<CareerRecommendation> findByUserIdAndIsSaved(Long userId, Boolean isSaved);
}
