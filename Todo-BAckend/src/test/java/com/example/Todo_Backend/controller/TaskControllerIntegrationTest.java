package com.example.Todo_Backend.controller;

import com.example.Todo_Backend.dto.TaskRequest;
import com.example.Todo_Backend.repository.TaskRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class TaskControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TaskRepo taskRepo;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setup() {
        taskRepo.deleteAll();
    }

    @Test
    void createTask_andGetById_shouldSucceed() throws Exception {
        TaskRequest request = new TaskRequest();
        request.setTitle("Integration Test Task");
        request.setDescription("Integration Desc");

        // Create task
        String response = mockMvc.perform(post("/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("Integration Test Task"))
                .andReturn().getResponse().getContentAsString();

        int id = objectMapper.readTree(response).get("id").asInt();

        // Get task by ID
        mockMvc.perform(get("/tasks/" + id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Integration Test Task"))
                .andExpect(jsonPath("$.completed").value(false));
    }

    @Test
    void markTaskAsDone_shouldReturnCompletedTrue() throws Exception {
        // Create a task
        TaskRequest request = new TaskRequest();
        request.setTitle("Done Task");
        request.setDescription("To be completed");

        String response = mockMvc.perform(post("/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andReturn().getResponse().getContentAsString();

        int id = objectMapper.readTree(response).get("id").asInt();

        // Mark as done
        mockMvc.perform(post("/tasks/" + id + "/done"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.completed").value(true));
    }

    @Test
    void getCompletedTasks_shouldReturnOnlyCompleted() throws Exception {
        // Create and complete a task
        TaskRequest request = new TaskRequest();
        request.setTitle("Completed Task");
        request.setDescription("Done");

        String response = mockMvc.perform(post("/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andReturn().getResponse().getContentAsString();

        int id = objectMapper.readTree(response).get("id").asInt();
        mockMvc.perform(post("/tasks/" + id + "/done"));

        // Create an incomplete task
        TaskRequest request2 = new TaskRequest();
        request2.setTitle("Incomplete Task");
        request2.setDescription("Not done");

        mockMvc.perform(post("/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request2)));

        // Get completed tasks
        mockMvc.perform(get("/tasks/completed"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].title").value("Completed Task"))
                .andExpect(jsonPath("$[0].completed").value(true));
    }
}
