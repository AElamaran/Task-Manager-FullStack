package dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TaskResponse {
    private int id;
    private String title;
    private String description;
    private LocalDateTime createdAt;
}
