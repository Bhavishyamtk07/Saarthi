package com.saarthi.controller;

import com.saarthi.dto.ChatRequest;
import com.saarthi.model.ChatMessage;
import com.saarthi.model.User;
import com.saarthi.repository.UserRepository;
import com.saarthi.service.ChatService;
import com.saarthi.util.MapUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;
    private final UserRepository userRepository;

    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestBody ChatRequest request, Authentication auth) {
        try {
            User user = getUser(auth);
            String response = chatService.chat(user.getId(), request.getMessage(), request.getSessionId());
            return ResponseEntity.ok(MapUtil.of("response", response, "sender", "AI"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(MapUtil.of("error", e.getMessage()));
        }
    }

    @GetMapping("/history")
    public ResponseEntity<?> getHistory(Authentication auth) {
        User user = getUser(auth);
        List<ChatMessage> messages = chatService.getChatHistory(user.getId());
        return ResponseEntity.ok(messages);
    }

    private User getUser(Authentication auth) {
        return userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
