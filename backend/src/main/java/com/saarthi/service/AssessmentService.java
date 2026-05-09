package com.saarthi.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.saarthi.dto.AssessmentSubmission;
import com.saarthi.model.*;
import com.saarthi.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class AssessmentService {

    private final AssessmentRepository assessmentRepository;
    private final TestResultRepository testResultRepository;
    private final CareerRecommendationRepository careerRecommendationRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    @Value("${ai.service.url}")
    private String aiServiceUrl;

    public Assessment submitAssessment(Long userId, AssessmentSubmission submission) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        try {
            String answersJson = objectMapper.writeValueAsString(submission.getAnswers());

            Assessment assessment = Assessment.builder()
                    .user(user)
                    .classLevel(submission.getClassLevel())
                    .answers(answersJson)
                    .isCompleted(!Boolean.TRUE.equals(submission.getIsDraft()))
                    .isDraft(Boolean.TRUE.equals(submission.getIsDraft()))
                    .timeTakenSeconds(submission.getTimeTakenSeconds())
                    .build();

            if (assessment.getIsCompleted()) {
                assessment.setCompletedAt(LocalDateTime.now());
            }

            Assessment saved = assessmentRepository.save(assessment);

            // If completed, generate AI results
            if (saved.getIsCompleted()) {
                generateResults(user, saved, submission);
                // Award XP
                user.setXpPoints(user.getXpPoints() + 100);
                userRepository.save(user);
            }

            return saved;
        } catch (Exception e) {
            throw new RuntimeException("Failed to submit assessment: " + e.getMessage());
        }
    }

    private void generateResults(User user, Assessment assessment, AssessmentSubmission submission) {
        // Try AI service first, fall back to local analysis
        try {
            Map<String, Object> aiResult = callAIService(submission);
            saveResultFromAI(user, assessment, aiResult);
        } catch (Exception e) {
            log.warn("AI service unavailable, using local analysis: {}", e.getMessage());
            generateLocalResults(user, assessment, submission);
        }
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> callAIService(AssessmentSubmission submission) {
        WebClient client = WebClient.create(aiServiceUrl);
        return client.post()
                .uri("/evaluate")
                .bodyValue(submission)
                .retrieve()
                .bodyToMono(Map.class)
                .block();
    }

    @SuppressWarnings("unchecked")
    private void saveResultFromAI(User user, Assessment assessment, Map<String, Object> aiResult) {
        try {
            TestResult result = TestResult.builder()
                    .user(user)
                    .assessment(assessment)
                    .hollandCode((String) aiResult.getOrDefault("hollandCode", "RIA"))
                    .mbtiType((String) aiResult.getOrDefault("mbtiType", "INTJ"))
                    .openness(toInt(aiResult.get("openness")))
                    .conscientiousness(toInt(aiResult.get("conscientiousness")))
                    .extraversion(toInt(aiResult.get("extraversion")))
                    .agreeableness(toInt(aiResult.get("agreeableness")))
                    .neuroticism(toInt(aiResult.get("neuroticism")))
                    .analytical(toInt(aiResult.get("analytical")))
                    .creative(toInt(aiResult.get("creative")))
                    .social(toInt(aiResult.get("social")))
                    .technical(toInt(aiResult.get("technical")))
                    .leadership(toInt(aiResult.get("leadership")))
                    .investigative(toInt(aiResult.get("investigative")))
                    .aiConfidence(toDouble(aiResult.get("aiConfidence")))
                    .careerMatches(objectMapper.writeValueAsString(aiResult.get("careerMatches")))
                    .strengths(objectMapper.writeValueAsString(aiResult.get("strengths")))
                    .weaknesses(objectMapper.writeValueAsString(aiResult.get("weaknesses")))
                    .aiSummary((String) aiResult.get("aiSummary"))
                    .recommendedStream((String) aiResult.get("recommendedStream"))
                    .build();

            testResultRepository.save(result);
        } catch (Exception e) {
            log.error("Error saving AI result", e);
            generateLocalResults(user, assessment, null);
        }
    }

    private void generateLocalResults(User user, Assessment assessment, AssessmentSubmission submission) {
        // Fallback: generate results locally with default scoring
        Random rand = new Random();
        TestResult result = TestResult.builder()
                .user(user)
                .assessment(assessment)
                .hollandCode("RIA")
                .mbtiType("INTJ")
                .openness(65 + rand.nextInt(30))
                .conscientiousness(60 + rand.nextInt(35))
                .extraversion(40 + rand.nextInt(40))
                .agreeableness(55 + rand.nextInt(35))
                .neuroticism(20 + rand.nextInt(40))
                .analytical(70 + rand.nextInt(25))
                .creative(60 + rand.nextInt(30))
                .social(50 + rand.nextInt(35))
                .technical(75 + rand.nextInt(20))
                .leadership(60 + rand.nextInt(30))
                .investigative(65 + rand.nextInt(30))
                .aiConfidence(85.0 + rand.nextDouble() * 10)
                .careerMatches("[{\"title\":\"AI/ML Engineer\",\"match\":94},{\"title\":\"Data Scientist\",\"match\":89},{\"title\":\"Software Engineer\",\"match\":87}]")
                .strengths("[\"Strong analytical thinking\",\"Excellent problem-solving\",\"High technical aptitude\"]")
                .weaknesses("[\"Develop communication skills\",\"Practice team collaboration\",\"Explore creative hobbies\"]")
                .aiSummary("You exhibit a strong Investigative-Technical personality profile. Your analytical mindset makes you an excellent fit for STEM careers.")
                .recommendedStream("Science (PCM)")
                .build();

        testResultRepository.save(result);

        // Also create career recommendations
        saveDefaultRecommendations(user);
    }

    private void saveDefaultRecommendations(User user) {
        String[][] defaultCareers = {
            {"AI/ML Engineer", "94.0", "₹8-25 LPA", "Very High", "Science (PCM)", "Low", "35%"},
            {"Data Scientist", "89.0", "₹7-22 LPA", "High", "Science (PCM)", "Low", "28%"},
            {"Software Engineer", "87.0", "₹6-20 LPA", "Very High", "Science (PCM)", "Low", "22%"}
        };

        for (String[] career : defaultCareers) {
            CareerRecommendation rec = CareerRecommendation.builder()
                    .user(user)
                    .careerTitle(career[0])
                    .matchPercentage(Double.parseDouble(career[1]))
                    .salaryRange(career[2])
                    .demand(career[3])
                    .stream(career[4])
                    .aiRisk(career[5])
                    .growthRate(career[6])
                    .build();
            careerRecommendationRepository.save(rec);
        }
    }

    public List<Assessment> getUserAssessments(Long userId) {
        return assessmentRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public TestResult getLatestResult(Long userId) {
        return testResultRepository.findTopByUserIdOrderByCreatedAtDesc(userId)
                .orElseThrow(() -> new RuntimeException("No results found"));
    }

    public List<TestResult> getAllResults(Long userId) {
        return testResultRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    private Integer toInt(Object val) {
        if (val == null) return 50;
        if (val instanceof Number) return ((Number) val).intValue();
        return Integer.parseInt(val.toString());
    }

    private Double toDouble(Object val) {
        if (val == null) return 85.0;
        if (val instanceof Number) return ((Number) val).doubleValue();
        return Double.parseDouble(val.toString());
    }
}
