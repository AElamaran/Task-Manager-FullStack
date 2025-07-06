package com.example.Todo_Backend.service;

import com.example.Todo_Backend.dto.TaskRequest;
import com.example.Todo_Backend.dto.TaskResponse;
import com.example.Todo_Backend.exception.TaskNotFoundException;
import com.example.Todo_Backend.model.Task;
import com.example.Todo_Backend.repository.TaskRepo;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class TaskServiceTest {

    @Mock
    private TaskRepo taskRepo;

    @InjectMocks
    private TaskService taskService;

    @Test
    void createTask_shouldReturnTaskResponse() {
        TaskRequest request = new TaskRequest();
        request.setTitle("Test Task");
        request.setDescription("Test Desc");

        Task saved = new Task();
        saved.setId(1);
        saved.setTitle("Test Task");
        saved.setDescription("Test Desc");

        when(taskRepo.save(any(Task.class))).thenReturn(saved);

        TaskResponse response = taskService.createTask(request);

        assertEquals("Test Task", response.getTitle());
        assertEquals("Test Desc", response.getDescription());
        assertFalse(response.isCompleted());
    }

    @Test
    void getTaskById_shouldThrowExceptionIfNotFound() {
        when(taskRepo.findById(1)).thenReturn(Optional.empty());

        assertThrows(TaskNotFoundException.class, () -> taskService.getTaskById(1));
    }

    @Test
    void markTaskAsDone_shouldSetCompletedTrue() {
        Task task = new Task();
        task.setId(2);
        task.setTitle("Task");
        task.setCompleted(false);

        when(taskRepo.findById(2)).thenReturn(Optional.of(task));
        when(taskRepo.save(any(Task.class))).thenAnswer(invocation -> invocation.getArgument(0));

        TaskResponse response = taskService.markTaskAsDone(2);

        assertTrue(response.isCompleted());
    }
}
