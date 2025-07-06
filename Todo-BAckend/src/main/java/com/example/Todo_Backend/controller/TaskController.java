package com.example.Todo_Backend.controller;

import com.example.Todo_Backend.service.TaskService;
import com.example.Todo_Backend.dto.TaskRequest;
import com.example.Todo_Backend.dto.TaskResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @Operation(summary = "Create a new task",
    description = "Creates a new to-do task and returns the created task details."
            )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Task created successfully",content = @Content(schema = @Schema(implementation = TaskResponse.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input",content = @Content)
    })
    @PostMapping
    public ResponseEntity<TaskResponse> createTask(@RequestBody TaskRequest request) {
        TaskResponse response = taskService.createTask(request);
        return ResponseEntity.status(201).body(response); // 201 Created
    }

    @Operation(
            summary = "Get the 5 most recent incomplete tasks",
            description = "Returns a list of the 5 most recently created tasks that are not completed."
    )
    @ApiResponse(
            responseCode = "200",
            description = "List of tasks",
            content = @Content(schema = @Schema(implementation = TaskResponse.class))
    )
    @GetMapping
    public ResponseEntity<List<TaskResponse>> getRecentTasks() {
        List<TaskResponse> tasks = taskService.getRecentTasks();
        return ResponseEntity.ok(tasks); // 200 OK
    }



    @Operation(
            summary = "Get a task by its ID",
            description = "Returns the details of a specific task by its unique ID."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Task details",
                    content = @Content(schema = @Schema(implementation = TaskResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Task not found",
                    content = @Content
            )
    })
    @GetMapping("/{id}")
    public ResponseEntity<TaskResponse> getTaskById(
            @Parameter(description = "ID of the task to retrieve", required = true)
            @PathVariable int id) {
        TaskResponse response = taskService.getTaskById(id);
        return ResponseEntity.ok(response);
    }

    // Task

    @Operation(
            summary = "Mark a task as completed",
            description = "Marks the specified task as completed and returns the updated task."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Task marked as done",
                    content = @Content(schema = @Schema(implementation = TaskResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Task not found",
                    content = @Content
            )
    })
    @PostMapping("/{id}/done")
    public ResponseEntity<TaskResponse> markTaskAsDone(
            @Parameter(description = "ID of the task to mark as done", required = true)
            @PathVariable int id) {
        TaskResponse response = taskService.markTaskAsDone(id);
        return ResponseEntity.ok(response);
    }



    @Operation(
            summary = "Delete a task by its ID",
            description = "Deletes the task with the specified ID."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "204",
                    description = "Task deleted successfully"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Task not found",
                    content = @Content
            )
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTaskById(
            @Parameter(description = "ID of the task to delete", required = true)
            @PathVariable int id) {
        taskService.deleteTaskById(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(
            summary = "Search tasks by title or description",
            description = "Searches tasks that contain the given keyword in their title or description."
    )
    @ApiResponse(
            responseCode = "200",
            description = "List of matching tasks",
            content = @Content(schema = @Schema(implementation = TaskResponse.class))
    )
    @GetMapping("/search")
    public ResponseEntity<List<TaskResponse>> searchTasks(
            @Parameter(description = "Keyword to search in title or description", required = true)
            @RequestParam String keyword) {
        List<TaskResponse> results = taskService.searchTasks(keyword);
        return ResponseEntity.ok(results);
    }

    @Operation(summary = "Get all completed tasks",
            description = "Returns a list of all tasks that are marked as completed.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "List of completed tasks",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = TaskResponse.class)))
    })
    @GetMapping("/completed")
    public ResponseEntity<List<TaskResponse>> getCompletedTasks() {
        List<TaskResponse> completedTasks = taskService.getCompletedTasks();
        return ResponseEntity.ok(completedTasks);
    }
}
