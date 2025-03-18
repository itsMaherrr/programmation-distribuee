package com.example.clientservice.controller;

import com.example.clientservice.data.UserBook;
import com.example.clientservice.data.User;
import com.example.clientservice.data.Book;
import com.example.clientservice.data.UserBookId;
import com.example.clientservice.dto.UserBookDTO;
import com.example.clientservice.repository.UserBookRepository;
import com.example.clientservice.repository.UserRepository;
import com.example.clientservice.repository.BookRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/users/{userId}/books")
public class UserBookController {
    private final UserBookRepository userBookRepo;
    private final UserRepository userRepo;
    private final BookRepository bookRepo;

    public UserBookController(UserBookRepository userBookRepo, UserRepository userRepo, BookRepository bookRepo) {
        this.userBookRepo = userBookRepo;
        this.userRepo = userRepo;
        this.bookRepo = bookRepo;
    }

    @CrossOrigin(origins = "*")
    @GetMapping
    public List<UserBookDTO> getUserBooks(@PathVariable Long userId) {
        return userBookRepo.findUserBooksWithDetails(userId);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/{bookId}")
    public UserBook addBookToUser(@PathVariable int userId, @PathVariable int bookId) {
        User user = userRepo.findById(userId).orElseThrow();
        Book book = bookRepo.findById(bookId).orElseThrow();

        UserBook userBook = new UserBook();
        userBook.setUser(user);
        userBook.setBook(book);
        return userBookRepo.save(userBook);
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/{bookId}/mark-read")
    public ResponseEntity<Map<String, Object>> markBookAsRead(@PathVariable int userId, @PathVariable int bookId) {
        int updatedRows = userBookRepo.markBookAsRead(userId, bookId);
        Map<String, Object> response = new HashMap<>();

        if (updatedRows > 0) {
            response.put("success", true);
            response.put("message", "Book marked as read");
        } else {
            response.put("success", false);
            response.put("message", "Book not found in user's list");
        }

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{bookId}/rate/{rating}")
    public UserBook rateBook(@PathVariable int userId, @PathVariable int bookId, @PathVariable int rating) {
        if (rating < 0 || rating > 10) throw new IllegalArgumentException("Rating must be between 0 and 10");

        UserBook userBook = userBookRepo.findById(new UserBookId(userId, bookId)).orElseThrow();
        userBook.setRating(rating);
        return userBookRepo.save(userBook);
    }
}
