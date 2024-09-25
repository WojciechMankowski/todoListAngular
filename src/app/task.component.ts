import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Task } from '../Types/Task';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { TaskService } from './task.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  featherTrash2,
  featherUser,
  featherCheck,
  featherX,
} from '@ng-icons/feather-icons';
import { featherCalendar } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule, NgIf, NgIconComponent],
  viewProviders: [
    provideIcons({ featherTrash2, featherUser, featherCheck, featherX }),
    provideIcons({ featherCalendar }),
  ],

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
        <p>Priorytet: {{ priority }}</p>
        <p>Opis: {{ task.description }}</p>
        <p>Data: {{ task.dueDate }} {{ task.time }}</p>
        <p *ngIf="task.repeats">Powtarza się: {{ getRepeats() }}</p>
        <button (click)="openAndCloseWindow()">
          <ng-icon name="featherTrash2" class="icon--hover" />
        </button>
        <div *ngIf="show" class="modal">
          <div class="modal-content">
            <p>Czy na pewno chcesz usunąć to zadanie: {{ task.title }}?</p>
            <button (click)="openAndCloseWindow()">Anuluj</button>
            <button (click)="delateTask()">Potwierdź</button>
          </div>
        </div>
        <button>
          <ng-icon name="featherCalendar" class="text-sm" />
        </button>
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
  @Output() taskDelet = new EventEmitter<number>();
  taskService = inject(TaskService);
  priority = this.taskService.getPriorityName(this.task.priority);
  repeatInfo = this.taskService.getInfoRepeats(this.task);
  show = false;

  getRepeats() {
    return this.taskService.getInfoRepeats(this.task);
  }
  changeStatusTask() {
    const updateTask: Task = { ...this.task, completed: !this.task.completed };
    this.taskChangedStatus.emit(updateTask);
  }
  delateTask() {
    const deleteTaskID = this.task.id;
    this.taskDelet.emit(deleteTaskID);
  }

  openAndCloseWindow() {
    this.show = !this.show;
  }
}
