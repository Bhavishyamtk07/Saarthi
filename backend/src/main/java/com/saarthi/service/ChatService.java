package com.saarthi.service;

import com.saarthi.model.ChatMessage;
import com.saarthi.model.User;
import com.saarthi.repository.ChatMessageRepository;
import com.saarthi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatService {

    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository;

    @Value("${ai.service.url}")
    private String aiServiceUrl;

    public String chat(Long userId, String message, String sessionId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Save user message
        ChatMessage userMsg = ChatMessage.builder()
                .user(user)
                .sessionId(sessionId != null ? sessionId : UUID.randomUUID().toString())
                .sender(ChatMessage.SenderType.USER)
                .message(message)
                .build();
        chatMessageRepository.save(userMsg);

        // Get AI response
        String aiResponse;
        try {
            aiResponse = callAIChatService(message, userId);
        } catch (Exception e) {
            log.warn("AI chat service unavailable, using fallback: {}", e.getMessage());
            aiResponse = getLocalResponse(message);
        }

        // Save AI response
        ChatMessage aiMsg = ChatMessage.builder()
                .user(user)
                .sessionId(userMsg.getSessionId())
                .sender(ChatMessage.SenderType.AI)
                .message(aiResponse)
                .build();
        chatMessageRepository.save(aiMsg);

        // Award XP for chatting
        user.setXpPoints(user.getXpPoints() + 5);
        userRepository.save(user);

        return aiResponse;
    }

    @SuppressWarnings("unchecked")
    private String callAIChatService(String message, Long userId) {
        WebClient client = WebClient.create(aiServiceUrl);
        Map<String, Object> body = new HashMap<>();
        body.put("message", message);
        body.put("userId", userId);
        Map<String, Object> response = client.post()
                .uri("/chat")
                .bodyValue(body)
                .retrieve()
                .bodyToMono(Map.class)
                .block();
        return response != null ? (String) response.get("response") : getLocalResponse(message);
    }

    private String getLocalResponse(String message) {
        String lower = message.toLowerCase();

        if (lower.contains("career") || lower.contains("job") || lower.contains("salary")) {
            return "Based on current industry trends, here are some excellent career paths:\n\n" +
                   "🤖 **AI/ML Engineer** — ₹8-25 LPA, Very High Demand\n" +
                   "📊 **Data Scientist** — ₹7-22 LPA, High Demand\n" +
                   "💻 **Software Developer** — ₹6-20 LPA, Very High Demand\n" +
                   "🏥 **Doctor (MBBS)** — ₹8-30 LPA, Always in Demand\n\n" +
                   "I recommend taking our AI Career Assessment to get personalized recommendations based on your personality and interests!";
        }

        if (lower.contains("stream") || lower.contains("10th") || lower.contains("choose") || lower.contains("pcm") || lower.contains("pcb")) {
            return "Choosing the right stream after 10th is a crucial decision! Here's a guide:\n\n" +
                   "📐 **Science (PCM)** — For Engineering, Technology, Research\n" +
                   "🔬 **Science (PCB)** — For Medicine, Pharmacy, Biotech\n" +
                   "📈 **Commerce** — For Business, CA, Banking, Finance\n" +
                   "🎨 **Arts/Humanities** — For Law, Design, Media, Civil Services\n\n" +
                   "Choose based on your genuine interests, not just peer pressure. What subjects do you enjoy the most?";
        }

        if (lower.contains("exam") || lower.contains("jee") || lower.contains("neet") || lower.contains("prepare")) {
            return "Here are some preparation tips:\n\n" +
                   "📚 **Start with NCERT** — Master the basics first\n" +
                   "🎯 **Practice daily** — Consistency beats intensity\n" +
                   "📝 **Solve previous year papers** — Understand exam patterns\n" +
                   "⏰ **Time management** — Create a study schedule and stick to it\n" +
                   "🧘 **Take breaks** — Mental health is equally important\n\n" +
                   "Would you like specific advice for JEE, NEET, or any other exam?";
        }

        if (lower.contains("college") || lower.contains("university") || lower.contains("admission")) {
            return "For college selection, consider:\n\n" +
                   "🏆 **Top Engineering**: IITs, NITs, IIITs, BITS\n" +
                   "🏥 **Top Medical**: AIIMS, CMC Vellore, JIPMER\n" +
                   "💼 **Top Commerce**: SRCC, Hindu College, Narsee Monjee\n" +
                   "⚖️ **Top Law**: NLUs (Delhi, Bangalore, Hyderabad)\n\n" +
                   "What field are you interested in? I can give more specific recommendations!";
        }

        if (lower.contains("scholarship") || lower.contains("financial")) {
            return "Here are some major scholarships for Indian students:\n\n" +
                   "🏅 **KVPY** — For science students\n" +
                   "📝 **NTSE** — National Talent Search\n" +
                   "💰 **Inspire Scholarship** — ₹80,000/year for science\n" +
                   "🎓 **PM Scholarship** — For defense/paramilitary wards\n" +
                   "📚 **State-level scholarships** — Check your state government portal\n\n" +
                   "Would you like help with any specific scholarship application?";
        }

        return "That's a great question! 🤔\n\n" +
               "I'd recommend starting with our **AI Career Assessment** — it analyzes your personality, interests, and aptitude to give personalized career guidance.\n\n" +
               "You can also ask me about:\n" +
               "• Career options after 10th/12th\n" +
               "• Exam preparation tips (JEE, NEET, etc.)\n" +
               "• College recommendations\n" +
               "• Scholarship opportunities\n" +
               "• Skill development resources\n\n" +
               "What specific guidance do you need?";
    }

    public List<ChatMessage> getChatHistory(Long userId) {
        return chatMessageRepository.findTop50ByUserIdOrderByCreatedAtDesc(userId);
    }
}
