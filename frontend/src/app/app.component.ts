import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Task {
  id?: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  newTitle = '';
  loading = false;
  error = '';

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';
    this.http.get<Task[]>('/api/tasks').subscribe({
      next: tasks => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: () => {
        this.error = 'Backend is not reachable yet.';
        this.loading = false;
      }
    });
  }

  add(): void {
    const title = this.newTitle.trim();
    if (!title) return;

    this.http.post<Task>('/api/tasks', { title, completed: false }).subscribe(task => {
      this.tasks = [...this.tasks, task];
      this.newTitle = '';
    });
  }

  toggle(task: Task): void {
    if (!task.id) return;
    this.http.put<Task>(`/api/tasks/${task.id}`, { ...task, completed: !task.completed })
      .subscribe(updated => {
        this.tasks = this.tasks.map(t => t.id === updated.id ? updated : t);
      });
  }

  remove(task: Task): void {
    if (!task.id) return;
    this.http.delete(`/api/tasks/${task.id}`).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
    });
  }
}
