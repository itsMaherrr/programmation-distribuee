package com.example.clientservice.data;

import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class UserBookId implements Serializable {
    private int userId;
    private int bookId;

    public UserBookId() {}
    public UserBookId(int userId, int bookId) {
    }
}
