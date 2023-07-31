package org.example;

import java.util.ArrayList;
import java.util.List;

public class TaskController {
    private List<Task> tasks;

    public TaskController() {
        this.tasks = new ArrayList<>();
    }

    public void addTask(String description) {
        Task task = new Task(description);
        tasks.add(task);
    }

    public boolean markTaskDone(int taskIndex) {
        if (taskIndex >= 0 && taskIndex < tasks.size()) {
            Task task = tasks.get(taskIndex);
            task.setDone(true);
            return true;
        }
        return false;
    }

    public List<Task> getTasks() {
        return tasks;
    }
}
