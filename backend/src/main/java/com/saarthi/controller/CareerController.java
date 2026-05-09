package com.saarthi.controller;

import com.saarthi.model.CareerRecommendation;
import com.saarthi.model.Roadmap;
import com.saarthi.model.User;
import com.saarthi.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/careers")
@RequiredArgsConstructor
public class CareerController {

    private final CareerRecommendationRepository careerRecommendationRepository;
    private final RoadmapRepository roadmapRepository;
    private final UserRepository userRepository;

    @GetMapping("/explore")
    public ResponseEntity<?> exploreCareers() {
        List<Map<String, Object>> careers = new ArrayList<>();

        careers.add(makeCareer(1, "AI/ML Engineer", "🤖", "Science", "₹8-25 LPA", "Very High", "Low", "35%", "B.Tech CSE/AI", "Technology", "Build intelligent systems using ML and deep learning.", Arrays.asList("Python", "TensorFlow", "Math", "DSA"), Arrays.asList("IIT Bombay", "IIT Delhi", "IIIT Hyderabad")));
        careers.add(makeCareer(2, "Data Scientist", "📊", "Science", "₹7-22 LPA", "High", "Low", "28%", "B.Tech/M.Sc Stats", "Technology", "Extract insights from data to drive decisions.", Arrays.asList("Python", "SQL", "Statistics", "ML"), Arrays.asList("ISI Kolkata", "IIT Madras", "CMI")));
        careers.add(makeCareer(3, "Doctor (MBBS)", "🏥", "Science (PCB)", "₹8-30 LPA", "Very High", "Very Low", "15%", "MBBS + MD/MS", "Healthcare", "Diagnose and treat patients.", Arrays.asList("Biology", "Chemistry", "Empathy"), Arrays.asList("AIIMS", "CMC Vellore", "JIPMER")));
        careers.add(makeCareer(4, "CA", "💼", "Commerce", "₹7-20 LPA", "High", "Medium", "12%", "CA Foundation+Inter+Final", "Finance", "Manage financials, audits, and taxation.", Arrays.asList("Accounting", "Tax", "Audit"), Arrays.asList("ICAI", "SRCC")));
        careers.add(makeCareer(5, "UX/UI Designer", "🎨", "Any", "₹5-18 LPA", "High", "Medium", "22%", "B.Des / Self-taught", "Design", "Create beautiful digital experiences.", Arrays.asList("Figma", "Design Thinking", "Prototyping"), Arrays.asList("NID", "IIT Bombay IDC")));
        careers.add(makeCareer(6, "Civil Services (IAS)", "🏛️", "Any", "₹6-12 LPA + perks", "Steady", "Very Low", "5%", "Any Grad + UPSC", "Government", "Serve the nation as an administrator.", Arrays.asList("GK", "Writing", "Leadership"), Arrays.asList("LBSNAA", "JNU")));
        careers.add(makeCareer(7, "Cybersecurity Analyst", "🔒", "Science", "₹6-20 LPA", "Very High", "Low", "32%", "B.Tech CSE", "Technology", "Protect organizations from cyber threats.", Arrays.asList("Networking", "Linux", "Ethical Hacking"), Arrays.asList("IIT Kanpur", "IIIT Delhi")));
        careers.add(makeCareer(8, "Content Creator", "📱", "Any", "₹3-50 LPA", "Very High", "Medium", "40%", "Any / Self-taught", "Media", "Create engaging content for digital platforms.", Arrays.asList("Storytelling", "Video Editing", "Social Media"), Arrays.asList("MICA", "Xavier's Mumbai")));
        careers.add(makeCareer(9, "Lawyer", "⚖️", "Arts/Commerce", "₹5-25 LPA", "High", "Low", "10%", "BA LLB / LLB", "Law", "Advocate for justice and legal rights.", Arrays.asList("Argumentation", "Research", "Writing"), Arrays.asList("NLU Delhi", "NALSAR")));

        return ResponseEntity.ok(careers);
    }

    private Map<String, Object> makeCareer(int id, String title, String icon, String stream, String salary, String demand, String aiRisk, String growth, String education, String category, String overview, List<String> skills, List<String> colleges) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id", id); m.put("title", title); m.put("icon", icon); m.put("stream", stream);
        m.put("salary", salary); m.put("demand", demand); m.put("aiRisk", aiRisk); m.put("growth", growth);
        m.put("education", education); m.put("category", category); m.put("overview", overview);
        m.put("skills", skills); m.put("colleges", colleges);
        return m;
    }

    @GetMapping("/recommended")
    public ResponseEntity<?> getRecommended(Authentication auth) {
        User user = getUser(auth);
        List<CareerRecommendation> recs = careerRecommendationRepository.findByUserIdOrderByMatchPercentageDesc(user.getId());
        return ResponseEntity.ok(recs);
    }

    @PostMapping("/save/{careerTitle}")
    public ResponseEntity<?> saveCareer(@PathVariable String careerTitle, Authentication auth) {
        User user = getUser(auth);
        CareerRecommendation rec = CareerRecommendation.builder()
                .user(user).careerTitle(careerTitle).isSaved(true).matchPercentage(0.0).build();
        careerRecommendationRepository.save(rec);
        Map<String, String> resp = new HashMap<>();
        resp.put("message", "Career saved");
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/roadmap/{careerTitle}")
    public ResponseEntity<?> getRoadmap(@PathVariable String careerTitle, Authentication auth) {
        User user = getUser(auth);
        Optional<Roadmap> existing = roadmapRepository.findByUserIdAndCareerTitle(user.getId(), careerTitle);
        return existing.map(r -> ResponseEntity.ok((Object) r))
                .orElseGet(() -> ResponseEntity.ok(generateDefaultRoadmap(user, careerTitle)));
    }

    private Roadmap generateDefaultRoadmap(User user, String careerTitle) {
        String steps;
        int totalSteps;
        if (careerTitle.toLowerCase().contains("ai") || careerTitle.toLowerCase().contains("ml")) {
            steps = "[{\"title\":\"Learn Python\",\"done\":false},{\"title\":\"Math for AI\",\"done\":false},{\"title\":\"DSA\",\"done\":false},{\"title\":\"Machine Learning\",\"done\":false},{\"title\":\"Deep Learning\",\"done\":false},{\"title\":\"Build Projects\",\"done\":false},{\"title\":\"Internship\",\"done\":false},{\"title\":\"Certifications\",\"done\":false}]";
            totalSteps = 8;
        } else if (careerTitle.toLowerCase().contains("data")) {
            steps = "[{\"title\":\"Python & SQL\",\"done\":false},{\"title\":\"Statistics\",\"done\":false},{\"title\":\"Data Visualization\",\"done\":false},{\"title\":\"ML Models\",\"done\":false},{\"title\":\"Big Data\",\"done\":false},{\"title\":\"Portfolio\",\"done\":false}]";
            totalSteps = 6;
        } else {
            steps = "[{\"title\":\"Foundation Skills\",\"done\":false},{\"title\":\"Core Knowledge\",\"done\":false},{\"title\":\"Practical Experience\",\"done\":false},{\"title\":\"Advanced Skills\",\"done\":false},{\"title\":\"Career Entry\",\"done\":false}]";
            totalSteps = 5;
        }
        Roadmap roadmap = Roadmap.builder().user(user).careerTitle(careerTitle).steps(steps).currentStep(0).totalSteps(totalSteps).isActive(true).build();
        return roadmapRepository.save(roadmap);
    }

    private User getUser(Authentication auth) {
        return userRepository.findByEmail(auth.getName()).orElseThrow(() -> new RuntimeException("User not found"));
    }
}
