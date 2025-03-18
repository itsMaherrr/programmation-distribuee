package com.example.clientservice.repository;

import com.example.clientservice.data.UserBook;
import com.example.clientservice.data.UserBookId;
import com.example.clientservice.dto.UserBookDTO;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserBookRepository extends JpaRepository<UserBook, UserBookId> {

    @Transactional
    @Modifying
    @Query("UPDATE UserBook ub SET ub.readStatus = true WHERE ub.user.id = :userId AND ub.book.id = :bookId")
    int markBookAsRead(@Param("userId") Integer userId, @Param("bookId") Integer bookId);

    @Query("SELECT new com.example.clientservice.dto.UserBookDTO(" +
            "b.id, b.isbn, b.title, b.author, b.publisher, b.category, b.imageUrl, ub.readStatus, ub.rating) " +
            "FROM UserBook ub JOIN ub.book b WHERE ub.user.id = :userId")
    List<UserBookDTO> findUserBooksWithDetails(@Param("userId") Long userId);
}
