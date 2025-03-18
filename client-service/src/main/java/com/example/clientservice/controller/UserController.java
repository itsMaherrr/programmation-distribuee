package com.example.clientservice.controller;

import com.example.clientservice.data.User;
import com.example.clientservice.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/users")
public class UserController {
    private final UserRepository userRepo;

    public UserController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> createUser(@RequestBody User userRequest) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);

        if (userRepo.findByEmail(userRequest.getEmail()).isPresent()) {
            response.put("message", "Email already in use");
            return ResponseEntity.ok(response);
        }

        userRequest.setPassword(hashPassword(userRequest.getPassword()));

        User savedUser = userRepo.save(userRequest);

        response.put("success", true);
        response.put("message", "User registered successfully");
        response.put("userId", savedUser.getId());
        response.put("fullName", savedUser.getFullName());

        return ResponseEntity.ok(response);
    }

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
