package com.saarthi.controller;

import com.saarthi.model.*;
import com.saarthi.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final UserRepository userRepository;
    private final AssessmentRepository assessmentRepository;
    private final TestResultRepository testResultRepository;
    private final CareerRecommendationRepository careerRecommendationRepository;
    private final RoadmapRepository roadmapRepository;

    @GetMapping("/student")
    public ResponseEntity<?> getStudentDashboard(Authentication auth) {
        User user = getUser(auth);
        Map<String, Object> dashboard = new HashMap<>();

        Map<String, Object> userMap = new HashMap<>();
        userMap.put("name", user.getName());
        userMap.put("email", user.getEmail());
        userMap.put("xpPoints", user.getXpPoints());
        userMap.put("classLevel", user.getClassLevel() != null ? user.getClassLevel() : "");
        userMap.put("school", user.getSchool() != null ? user.getSchool() : "");
        dashboard.put("user", userMap);

        List<Assessment> assessments = assessmentRepository.findByUserIdAndIsCompleted(user.getId(), true);
        dashboard.put("testsCompleted", assessments.size());

        List<CareerRecommendation> saved = careerRecommendationRepository.findByUserIdAndIsSaved(user.getId(), true);
        dashboard.put("savedCareers", saved.size());

        List<Roadmap> roadmaps = roadmapRepository.findByUserIdAndIsActive(user.getId(), true);
        dashboard.put("activeRoadmaps", roadmaps.size());

        testResultRepository.findTopByUserIdOrderByCreatedAtDesc(user.getId())
                .ifPresent(result -> dashboard.put("latestResult", result));

        List<CareerRecommendation> recs = careerRecommendationRepository.findByUserIdOrderByMatchPercentageDesc(user.getId());
        dashboard.put("recommendations", recs);

        // Badges
        List<Map<String, Object>> badges = new ArrayList<>();
        badges.add(makeBadge("First Test", "🎯", assessments.size() > 0));
        badges.add(makeBadge("Explorer", "🌍", true));
        badges.add(makeBadge("AI Chatted", "🤖", true));
        badges.add(makeBadge("Roadmap Pro", "🗺️", roadmaps.size() > 0));
        badges.add(makeBadge("Streak 7", "🔥", false));
        badges.add(makeBadge("Scholar", "📚", assessments.size() >= 3));
        dashboard.put("badges", badges);

        return ResponseEntity.ok(dashboard);
    }

    private Map<String, Object> makeBadge(String name, String emoji, boolean earned) {
        Map<String, Object> badge = new HashMap<>();
        badge.put("name", name);
        badge.put("emoji", emoji);
        badge.put("earned", earned);
        return badge;
    }

    @GetMapping("/teacher")
    public ResponseEntity<?> getTeacherDashboard(Authentication auth) {
        User user = getUser(auth);
        Map<String, Object> dashboard = new HashMap<>();

        Map<String, Object> userMap = new HashMap<>();
        userMap.put("name", user.getName());
        userMap.put("role", "TEACHER");
        dashboard.put("user", userMap);

        List<User> students = userRepository.findByRole(User.Role.STUDENT);
        dashboard.put("totalStudents", students.size());
        dashboard.put("students", students.stream().map(s -> {
            Map<String, Object> sm = new HashMap<>();
            sm.put("id", s.getId());
            sm.put("name", s.getName());
            sm.put("email", s.getEmail());
            sm.put("classLevel", s.getClassLevel() != null ? s.getClassLevel() : "");
            sm.put("xpPoints", s.getXpPoints());
            return sm;
        }).collect(Collectors.toList()));

        return ResponseEntity.ok(dashboard);
    }

    @GetMapping("/parent")
    public ResponseEntity<?> getParentDashboard(Authentication auth) {
        User user = getUser(auth);
        Map<String, Object> dashboard = new HashMap<>();
        Map<String, Object> userMap = new HashMap<>();
        userMap.put("name", user.getName());
        userMap.put("role", "PARENT");
        dashboard.put("user", userMap);
        dashboard.put("message", "Parent dashboard - link your child's account to see their progress");
        return ResponseEntity.ok(dashboard);
    }

    private User getUser(Authentication auth) {
        return userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
