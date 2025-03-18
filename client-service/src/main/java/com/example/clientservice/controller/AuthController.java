package com.example.clientservice.controller;

import com.example.clientservice.dto.LoginRequest;
import com.example.clientservice.data.User;
import com.example.clientservice.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserRepository userRepo;

    public AuthController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest loginRequest) {
        Optional<User> user = userRepo.findByEmail(loginRequest.getEmail());

        Map<String, Object> response = new HashMap<>();

        if (user.isPresent() && hashPassword(loginRequest.getPassword()).equals(user.get().getPassword())) {
            response.put("success", true);
            response.put("message", "Login successful");
            response.put("userId", user.get().getId());
            response.put("fullName", user.get().getFullName());
        } else {
            response.put("success", false);
            response.put("message", "Invalid email or password");
        }

        return ResponseEntity.ok(response);
    }

    // Hash function using SHA-256
    private String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] encodedHash = digest.digest(password.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : encodedHash) {
                hexString.append(String.format("%02x", b));
            }
            return hexString.toString();
        } catch (Exception e) {
            throw new RuntimeException("Error hashing password", e);
        }
    }
}
