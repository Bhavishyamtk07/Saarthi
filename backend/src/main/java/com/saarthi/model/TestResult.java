package com.saarthi.model;

import javax.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "test_results")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TestResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assessment_id", nullable = false)
    private Assessment assessment;

    // Holland Code (RIASEC)
    @Column(name = "holland_code")
    private String hollandCode; // e.g., "RIA"

    // MBTI Type
    @Column(name = "mbti_type")
    private String mbtiType; // e.g., "INTJ"

    // Big Five scores (0-100)
    private Integer openness;
    private Integer conscientiousness;
    private Integer extraversion;
    private Integer agreeableness;
    private Integer neuroticism;

    // Personality dimensions (0-100)
    private Integer analytical;
    private Integer creative;
    private Integer social;
    private Integer technical;
    private Integer leadership;
    private Integer investigative;

    // AI Confidence Score
    @Column(name = "ai_confidence")
    private Double aiConfidence;

    // Career matches as JSON
    @Column(name = "career_matches", columnDefinition = "TEXT")
    private String careerMatches;

    // Strengths & weaknesses as JSON
    @Column(columnDefinition = "TEXT")
    private String strengths;

    @Column(columnDefinition = "TEXT")
    private String weaknesses;

    // AI Summary
    @Column(name = "ai_summary", columnDefinition = "TEXT")
    private String aiSummary;

    // Recommended stream
    @Column(name = "recommended_stream")
    private String recommendedStream;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
