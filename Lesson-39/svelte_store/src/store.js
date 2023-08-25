import { writable } from 'svelte/store';

// Inisialisasi store
export const tasks = writable([]);

// Fungsi untuk menambahkan tugas
export function addTask(task) {
  tasks.update(existingTasks => [...existingTasks, task]);
}

// Fungsi untuk menghapus tugas
export function removeTask(id) {
  tasks.update(existingTasks => existingTasks.filter(task => task.id !== id));
}