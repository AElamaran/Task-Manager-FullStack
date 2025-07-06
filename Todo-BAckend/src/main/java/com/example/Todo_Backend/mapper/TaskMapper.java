package com.example.Todo_Backend.mapper;

import com.example.Todo_Backend.model.Task;
import com.example.Todo_Backend.dto.TaskRequest;
import com.example.Todo_Backend.dto.TaskResponse;

public class TaskMapper {
    // Map Task entity to TaskResponse DTO
    public static TaskResponse toResponse(Task task) {
        if (task == null) return null;
        TaskResponse resp = new TaskResponse();
        resp.setId(task.getId());
        resp.setTitle(task.getTitle());
        resp.setDescription(task.getDescription());
        resp.setCompleted(task.isCompleted());
        resp.setCreatedAt(task.getCreatedAt());
        return resp;
    }

    // Map TaskRequest DTO to Task entity (for creation)
    public static Task toEntity(TaskRequest request) {
        if (request == null) return null;
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        // completed and createdAt can be set by default in Task entity
        return task;
    }
}
