import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Task } from '../Types/Task';
import { TaskComponent } from './task.component';
import { NgFor } from '@angular/common';
import { TasksService } from './tasks-service.service';
// import { AddTaskComponent } from './add-task.component';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [TaskComponent, NgFor],
  template: `
    <div class="grid grid-cols-3 gap-4">
      <div *ngFor="let task of tasks">
        <app-task
          [task]="task"
          (taskChangedStatus)="updateTaskStatus(task)"
          (taskDelet)="deletTask(task.id )"
        ></app-task>
      </div>
    </div>
  `,
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
        } else {
          alert('Nie można zauktlizować statusu zadania');
        }
      });
  }
  deletTask(taskID: number | undefined) {
    this.tasksService.deletTask(taskID).then((response) => {
      if ('id' in response) {
        const taskID = response.id;
        this.tasks = this.tasks.filter((task) => task.id !== taskID);
      } else {
        alert('Nie można usunąć zadania');
      }
    });
  }
}
