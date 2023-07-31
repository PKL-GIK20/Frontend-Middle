package org.example;

import org.example.Task;
import org.example.TaskController;
import org.example.TaskView;

import java.util.List;

public class Main {
    public static void main(String[] args) {
        TaskView view = new TaskView();
        TaskController controller = new TaskController();

        while (true) {
            List<Task> tasks = controller.getTasks();
            view.showTasks(tasks);

            String choice = view.getInput("1. Add Task\n2. Mark Task Done\n3. Exit\nChoice: ");

            if (choice.equals("1")) {
                String description = view.getInput("Enter task description: ");
                controller.addTask(description);
            } else if (choice.equals("2")) {
                int taskIndex = Integer.parseInt(view.getInput("Enter task number to mark as done: ")) - 1;
                if (controller.markTaskDone(taskIndex)) {
                    view.showMessage("Task marked as done.");
                } else {
                    view.showMessage("Invalid task number.");
                }
            } else if (choice.equals("3")) {
                break;
            } else {
                view.showMessage("Invalid choice. Please try again.");
            }
        }
    }
}
