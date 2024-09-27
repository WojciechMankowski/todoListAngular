import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Task } from '../utils/types/Task';
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
    <div
      class="
        grid grid-cols-2 gap-4
        bg-gray-300 border col-span-1
        border-gray-300 shadow-md 
        rounded-lg
        p-4 
        mb-4 
        mr-8"
    >
      <div class="h-40">
        <input
          type="checkbox"
          [(ngModel)]="task.completed"
          class="mr-2"
          (click)="changeStatusTask()"
        />
        <h3 class="text-lg font-medium text-gray-800">{{ task.title }}</h3>
        <p>Priorytet: {{ priority }}</p>
      </div>

      <div class="h-40">
        <p class="text-sm">Opis: {{ task.description }}</p>
        <p class="text-sm">Data: {{ task.dueDate }} {{ task.time }}</p>
        <p *ngIf="task.repeats" class="text-sm">
          Powtarza się: {{ getRepeats() }}
        </p>
      </div>

      <div class="col-span-3 flex flex-col ">
        <div class="flex items-center justify-center h-18 pt-4">
          <button (click)="openAndCloseWindow()" *ngIf="!show">
            <ng-icon name="featherTrash2" size="1.5rem" />
          </button>
          <button>
            <ng-icon
              name="featherCalendar"
              class="mr-2"
              *ngIf="!show"
              size="1.5rem"
            />
          </button>

          <div *ngIf="show">
            <p>Czy na pewno chcesz usunąć to zadanie?</p>
            <button (click)="delateTask()">
              <ng-icon
                name="featherCheck"
                class="icon--hover"
                color="green"
                size="1.5rem"
              />
            </button>
            <button (click)="openAndCloseWindow()">
              <ng-icon
                name="featherX"
                class="icon--hover"
                color="red"
                size="1.5rem"
              />
            </button>
          </div>
        </div>
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
  priority = this.taskService.getPriorityName(this.task.priority as string);
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
