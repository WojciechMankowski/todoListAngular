import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodolistComponent } from './todolist.component';
import listState from './stateTask';
import { NgIf } from '@angular/common';
import { TasksService } from './tasks-service.service';
import { Task } from '../Types/Task';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodolistComponent, NgIf],
  template: `
    <div class="flex flex-col justify-center items-center min-h-screen">
      <header class="text-center mb-4 bg-gray-200 w-full h-35">
        <h2 class="text-2xl font-semibold">Lista zadań</h2>
      </header>
      <div class="max-w-screen-lg">
        <p *ngIf="listState.state === 'loading'" class="text-gray-500">
          Loading...
        </p>
        <p
          *ngIf="listState.state === 'error'"
          class="text-red-500 font-bold text-lg"
        >
          {{ listState.error.message }}
        </p>
        <app-todolist
          [tasks]="listState.response"
          *ngIf="listState.state === 'succes'"
          class="text-xl"
          (updtateTask)="updateTasks()"
        ></app-todolist>
      </div>
    </div>
  `,
})
export class AppComponent {
  title = 'Lista zadań';
  listState: listState = { state: 'succes', response: [] };
  tasksService = inject(TasksService);

  ngOnInit() {
    this.listState = { state: 'loading' };
    this.tasksService.getALL().then((tasks) => {
      if (Array.isArray(tasks)) {
        this.listState = {
          state: 'succes',
          response: tasks,
        };
      } else {
        this.listState = { state: 'error', error: tasks };
      }
    });
  }

  updateTasks(tasks: Task[] = []) {
    if (this.listState.state === 'succes') {
      // console.table(this.listState.response);
      this.listState = { state: 'succes', response: tasks };
      // console.table(this.listState.response);
    }
  }
  // funkcja do dodwania zadania
  // funkcja do usuwania zadania i edytowania zadania
}
