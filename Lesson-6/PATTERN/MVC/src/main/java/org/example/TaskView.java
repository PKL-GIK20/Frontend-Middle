package org.example;

import java.util.List;
import java.util.Scanner;

public class TaskView {
    public void showTasks(List<Task> tasks) {
        int taskNumber = 1;
        for (Task task : tasks) {
            String status = task.isDone() ? "Done" : "Not Done";
            System.out.println(taskNumber + ". " + task.getDescription() + " - " + status);
            taskNumber++;
        }
    }

    public void showMessage(String message) {
        System.out.println(message);
    }

    public String getInput(String prompt) {
        System.out.print(prompt);
        Scanner scanner = new Scanner(System.in);
        return scanner.nextLine();
    }
}
