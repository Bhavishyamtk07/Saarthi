package com.saarthi.repository;

import com.saarthi.model.Roadmap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface RoadmapRepository extends JpaRepository<Roadmap, Long> {
    List<Roadmap> findByUserIdOrderByCreatedAtDesc(Long userId);
    Optional<Roadmap> findByUserIdAndCareerTitle(Long userId, String careerTitle);
    List<Roadmap> findByUserIdAndIsActive(Long userId, Boolean isActive);
}
