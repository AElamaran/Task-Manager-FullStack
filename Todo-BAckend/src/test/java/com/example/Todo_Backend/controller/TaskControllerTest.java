package com.example.Todo_Backend.controller;

import com.example.Todo_Backend.dto.TaskRequest;
import com.example.Todo_Backend.dto.TaskResponse;
import com.example.Todo_Backend.exception.TaskNotFoundException;
import com.example.Todo_Backend.service.TaskService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;

import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TaskController.class)
public class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private TaskService taskService;

    @Test
    void createTask_shouldReturn201AndTask() throws Exception {
        TaskRequest request = new TaskRequest();
        request.setTitle("Test");
        request.setDescription("Desc");

        TaskResponse response = new TaskResponse();
        response.setId(1);
        response.setTitle("Test");
        response.setDescription("Desc");
        response.setCompleted(false);

        when(taskService.createTask(any(TaskRequest.class))).thenReturn(response);

        mockMvc.perform(post("/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.title").value("Test"))
                .andExpect(jsonPath("$.description").value("Desc"))
                .andExpect(jsonPath("$.completed").value(false));
    }

    @Test
    void getTaskById_shouldReturn404IfNotFound() throws Exception {
        when(taskService.getTaskById(99)).thenThrow(new TaskNotFoundException("Task not found"));

        mockMvc.perform(get("/tasks/99"))
                .andExpect(status().isNotFound());
    }
}
