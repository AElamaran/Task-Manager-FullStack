package com.example.Todo_Backend.repository;

import com.example.Todo_Backend.model.Task;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.tuple;
import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;

@DataJpaTest
@ActiveProfiles("test")
public class TaskRepoTest {

    @Autowired
    private TaskRepo taskRepo;

    @Test
    void findByCompletedTrue_shouldReturnOnlyCompletedTasks() {
        // Given
        Task t1 = new Task();
        t1.setTitle("Completed Task");
        t1.setCompleted(true);
        t1.setCreatedAt(LocalDateTime.now());
        taskRepo.save(t1);

        Task t2 = new Task();
        t2.setTitle("Not Completed");
        t2.setCompleted(false);
        t2.setCreatedAt(LocalDateTime.now());
        taskRepo.save(t2);

        // Ensure entities are written to the DB
        taskRepo.flush();

        // When
        List<Task> completedTasks = taskRepo.findByCompletedTrue();

        // Then
        assertThat(completedTasks)
                .extracting(Task::getTitle, Task::isCompleted)
                .containsExactly(tuple("Completed Task", true));
    }
}
