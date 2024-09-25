import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Task } from '../Types/Task';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import numerals from './Numerals';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule, NgIf],
  template: `
    <div class="bg-blue shadow-md rounded-lg p-4">
      <div class="flex items-center">
        <input
          type="checkbox"
          [(ngModel)]="task.completed"
          class="mr-2"
          (click)="changeStatusTask()"
        />
        <h3 class="text-lg font-medium">{{ task.title }}</h3>
      </div>
      <div class="mt-2">
        <p>Priorytet: {{ priority}}</p>
        <p>Opis: {{ task.description }}</p>
        <p>Data: {{ task.dueDate }} {{ task.time }}</p>
        <p *ngIf="task.repeats">Powtarza się: {{ getRepeats() }}</p>
      </div>
    </div>
  `,
})
export class TaskComponent {
  @Input() task: Task = {
    id: 0,
    title: '',
    description: '',
    completed: false,
    dueDate: undefined,
    time: 0,
    priority: 'high',
    repeats: false,
  };
  @Output() taskChangedStatus = new EventEmitter<Task>();
  taskService = inject(TaskService)
  priority = this.taskService.getPriorityName(this.task.priority)
  repeatInfo = this.taskService.getInfoRepeats(this.task)
  getRepeats(){
    return this.taskService.getInfoRepeats(this.task)
  }
  changeStatusTask() {
    const updateTask: Task = { ...this.task, completed: !this.task.completed };
    this.taskChangedStatus.emit(updateTask)
  }
}
