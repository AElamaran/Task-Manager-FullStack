package com.example.Todo_Backend.dto;

import lombok.Data;

@Data
public class TaskRequest {
    private String title;
    private String description;
}