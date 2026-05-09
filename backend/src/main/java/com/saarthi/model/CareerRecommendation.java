package com.saarthi.model;

import javax.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "career_recommendations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CareerRecommendation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "career_title", nullable = false)
    private String careerTitle;

    @Column(name = "match_percentage")
    private Double matchPercentage;

    @Column(columnDefinition = "TEXT")
    private String overview;

    @Column(name = "salary_range")
    private String salaryRange;

    private String demand;
    private String stream;

    @Column(name = "ai_risk")
    private String aiRisk;

    @Column(name = "growth_rate")
    private String growthRate;

    @Column(columnDefinition = "TEXT")
    private String skills; // JSON array

    @Column(columnDefinition = "TEXT")
    private String colleges; // JSON array

    private String education;

    @Column(name = "is_saved")
    private Boolean isSaved = false;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
