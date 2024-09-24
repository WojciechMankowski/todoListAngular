import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Task } from '../Types/Task';
import { TaskComponent } from './task.component';
import { NgFor } from '@angular/common';
import { TasksService } from './task-service.service';
@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [TaskComponent, NgFor],
  template: `<ul>
    <li *ngFor="let task of tasks">
      <app-task
        [task]="task"
        (taskChangedStatus)="updateTaskStatus(task)"
      ></app-task>
    </li>
  </ul>`,
})
export class TodolistComponent {
  @Input() tasks: Task[] = [];
  @Output() updtateTask = new EventEmitter<Task[]>();

  tasksService = inject(TasksService);

  updateTaskStatus(newTask: Task) {
    this.tasksService
      .updateStatus(newTask.id, !newTask.completed)
      .then((response) => {
        if ('id' in response) {
          this.tasks = [...this.tasks, response];
        }
      });
  }
}
