package com.example.clientservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserBookDTO {
    private Integer id;
    private String isbn;
    private String title;
    private String author;
    private String publisher;
    private String category;
    private String imageUrl;
    private boolean readStatus;
    private Integer rating;
}

