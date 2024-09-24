import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../Types/Task';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import numerals from './Numerals';

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
        <p>Priorytet: {{ this.getPriorityName(task.priority) }}</p>
        <p>Opis: {{ task.description }}</p>
        <p>Data: {{ task.dueDate }} {{ task.time }}</p>
        <p *ngIf="task.repeats">Powtarza się: {{ getInfoRepeats() }}</p>
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
  getPriorityName(priority: string): string {
    switch (priority) {
      case 'high':
        return 'wysoki';
      case 'medium':
        return 'średni';
      case 'low':
        return 'niski';
      default:
        return 'nie znany';
    }
  }

  getInfoRepeats(): string {
    if (this.task.repeats) {
      const every = this.task.repeatInterval?.every as number;
      const type = this.task.repeatInterval?.type as
        | 'days'
        | 'weeks'
        | 'months'
        | 'years';
      const numeralsDict: { [key: number]: string } = numerals;
      const everyInPolish = numeralsDict[every] || 'nieznany';
      let typeInPolish;
      switch (type) {
        case 'days':
          typeInPolish = 'dni';
          break;
        case 'weeks':
          typeInPolish = 'tygodni';
          break;
        case 'months':
          typeInPolish = 'miesięcy';
          break;
        case 'years':
          typeInPolish = 'lat';
          break;
        default:
          typeInPolish = 'nieznany!!';
      }
      let repeatInfo;
      if (type === 'days' && every === 1) {
        repeatInfo = 'codziennie';
      } else if (type === 'weeks' && every === 1) {
        repeatInfo = 'raz w tygodniu';
      } else if (type === 'months' && every === 1) {
        repeatInfo = 'raz w miesiącu';
      } else if (type === 'years' && every === 1) {
        repeatInfo = 'raz w roku';
      } else {
        repeatInfo = `co ${everyInPolish} ${typeInPolish}`;
      }
      return repeatInfo;
    } else {
      return '';
    }
  }
  changeStatusTask() {
    const updateTask: Task = { ...this.task, completed: !this.task.completed };
    this.taskChangedStatus.emit(updateTask)
  }
}
