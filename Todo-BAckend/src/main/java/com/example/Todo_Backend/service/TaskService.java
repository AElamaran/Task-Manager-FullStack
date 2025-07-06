package com.example.Todo_Backend.service;

import com.example.Todo_Backend.exception.TaskNotFoundException;
import com.example.Todo_Backend.mapper.TaskMapper;
import com.example.Todo_Backend.model.Task;
import com.example.Todo_Backend.repository.TaskRepo;
import com.example.Todo_Backend.dto.TaskRequest;
import com.example.Todo_Backend.dto.TaskResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {
    private final TaskRepo taskRepo;

    public TaskService(TaskRepo taskRepo) {
        this.taskRepo = taskRepo;
    }

    public TaskResponse createTask(TaskRequest request) {
        Task task = TaskMapper.toEntity(request);
        Task saved = taskRepo.save(task);
        return TaskMapper.toResponse(saved);
    }

//    private TaskResponse toResponse(Task task) {
//        TaskResponse resp = new TaskResponse();
//        resp.setId(task.getId());
//        resp.setTitle(task.getTitle());
//        resp.setDescription(task.getDescription());
//        resp.setCreatedAt(task.getCreatedAt());
//        return resp;
//    }

    public List<TaskResponse> getRecentTasks() {
        return taskRepo.findTop5ByCompletedFalseOrderByCreatedAtDesc()
                .stream().map(TaskMapper::toResponse).collect(Collectors.toList());
    }

    public TaskResponse getTaskById(int id) {
        Task task = taskRepo.findById(id)
                .orElseThrow(() -> new TaskNotFoundException("Task not found with ID: " + id));
        return TaskMapper.toResponse(task);
    }

    public TaskResponse markTaskAsDone(int id) {
        Task task = taskRepo.findById(id)
                .orElseThrow(() -> new TaskNotFoundException("Task not found with ID: " + id));
        task.setCompleted(true);
        Task updated = taskRepo.save(task);
        return TaskMapper.toResponse(updated);
    }

    public void deleteTaskById(int id) {
        if (!taskRepo.existsById(id)) {
            throw new TaskNotFoundException("Task not found with ID: " + id);
        }
        taskRepo.deleteById(id);
    }

    public List<TaskResponse> searchTasks(String keyword) {
        List<Task> tasks = taskRepo.searchByTitleOrDescription(keyword);
        return tasks.stream().map(TaskMapper::toResponse).collect(Collectors.toList());
    }

    public List<TaskResponse> getCompletedTasks() {
        List<Task> completedTasks = taskRepo.findByCompletedTrue();
        return completedTasks.stream()
                .map(TaskMapper::toResponse)
                .collect(Collectors.toList());
    }

}
