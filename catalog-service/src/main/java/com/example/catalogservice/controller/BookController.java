package com.example.catalogservice.controller;

import com.example.catalogservice.data.Book;
import com.example.catalogservice.repository.BookRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/books")
public class BookController {
    private final BookRepository bookRepo;

    public BookController(BookRepository bookRepo) {
        this.bookRepo = bookRepo;
    }

    @CrossOrigin(origins = "*")
    @GetMapping
    public List<Book> getAllBooks() {
        return bookRepo.findAll(PageRequest.of(2, 30)).getContent();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/search")
    public List<Book> searchBooks(@RequestParam String query) {
        return bookRepo.searchBooks(query, PageRequest.of(0, 30)).getContent();
    }

    @GetMapping("/{id}")
    public Optional<Book> getBookByIsbn(@PathVariable int id) {
        return bookRepo.findById(id);
    }
}
