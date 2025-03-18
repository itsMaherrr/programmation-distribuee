package com.example.catalogservice.repository;

import com.example.catalogservice.data.UserBook;
import com.example.catalogservice.data.UserBookId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserBookRepository extends JpaRepository<UserBook, UserBookId> {}
