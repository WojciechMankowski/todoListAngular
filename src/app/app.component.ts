import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodolistComponent } from './todolist.component';
import { Task } from './Type/Task';
import listState from './state/stateTask';
import ErrorType from './Type/errorType';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodolistComponent, NgIf],
  template: `
  <p *ngIf="listState.state === 'loading' ">Loading ...</p>
  <p *ngIf="listState.state === 'error'" >{{listState.error.message}}</p>
  <app-todolist [tasks]="listState.response" *ngIf="listState.state === 'succes'"></app-todolist>`,
})
export class AppComponent {
  tasks: Task[] = [];
  listState: listState = { state: 'start' };
  private readonly URL = 'http://localhost:3000';
  constructor() {
    this.listState = { state: 'loading' };
    fetch(`${this.URL}/tasks`)
      .then<Task[] | ErrorType>((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return {
            status: response.status,
            message: response.statusText,
          };
        }
      })
      .then((tasks) => {
        if (Array.isArray(tasks)) {
          setTimeout(() => {
            this.listState = {
              state: 'succes',
              response: tasks,
            };
          }, 1200);
        } else {
          this.listState = { state: 'error', error: tasks };
        }
      });
  }
}
