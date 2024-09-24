import { Component, Input } from '@angular/core';
import { Task } from './Type/Task';
import { TaskComponent } from './task.component';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [TaskComponent, NgFor],
  template: `<ul>
    <li *ngFor="let task of tasks">
      <app-task [task]="task"></app-task>
    </li>
  </ul>`
})
export class TodolistComponent {
  @Input() tasks: Task[] = [];
}