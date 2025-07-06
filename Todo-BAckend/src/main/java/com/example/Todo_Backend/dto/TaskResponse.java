package com.example.Todo_Backend.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TaskResponse {
    private int id;
    private String title;
    private String description;
    private boolean completed;
    private LocalDateTime createdAt;
}