package com.saarthi.model;

import javax.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "assessments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Assessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "class_level", nullable = false)
    private String classLevel; // "8", "10", "12"

    @Column(columnDefinition = "TEXT")
    private String answers; // JSON string of answers

    @Column(name = "is_completed")
    private Boolean isCompleted = false;

    @Column(name = "is_draft")
    private Boolean isDraft = false;

    @Column(name = "time_taken_seconds")
    private Integer timeTakenSeconds;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
