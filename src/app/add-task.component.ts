import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Task } from '../Types/Task';

type KeyTask = 'title' | 'priority' | 'type' | 'every';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor],
  template: `
    <form [formGroup]="task" class="space-y-4">
      <div class="flex flex-row">
        <label for="title" class="text-gray-700 font-bold">Tytuł zadania</label>
        <input
          type="text"
          id="title"
          formControlName="title"
          class="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2 mr-8"
        />
        <p class="text-red-500" *ngIf="isErrorField.title">
          Podaj tytuł zadania
        </p>
        <label for="dueDate" class="text-gray-700 font-bold"
          >Termin wykonania</label
        >
        <input
          type="date"
          id="dueDate"
          formControlName="dueDate"
          class="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2"
        />
      </div>

      <div class="flex flex-col">
        <label for="description" class="text-gray-700 font-bold">Opis</label>
        <textarea
          id="description"
          formControlName="description"
          class="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <div class="flex flex-row items-center justify-center">
        <label for="priority" class="text-gray-700 font-bold">Priorytet</label>
        <select
          id="priority"
          formControlName="priority"
          class="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 m-4 w-1/2"
        >
          <option
            *ngFor="let priority of priorities"
            [ngValue]="priority.value"
          >
            {{ priority.viewValue }}
          </option>
        </select>
        <p class="text-red-500 pr-8" *ngIf="isErrorField.priority">
          Podaj priorytetr
        </p>
        <label for="repeats" class="text-gray-700 font-bold"
          >Powtarza się</label
        >
        <input
          type="checkbox"
          id="repeats"
          formControlName="repeats"
          class="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 m-4"
        />
      </div>

      <div *ngIf="task.get('repeats')?.value" class="space-y-4">
        <div class="flex flex-row items-center justify-center">
          <label for="repeatIntervalType" class="text-gray-700 font-bold"
            >Typ powtórzeń</label
          >
          <select id="repeatIntervalType" formControlName="type">
            <option *ngFor="let typeValue of types" [ngValue]="typeValue.value">
              {{ typeValue.viewValue }}
            </option>
          </select>
          <p class="text-red-500 " *ngIf="isErrorField.type">
            Podaj priorytetr
          </p>
        </div>

        <div class="flex flex-col">
          <label for="repeatIntervalEvery" class="text-gray-700 font-bold"
            >Co</label
          >
          <input
            type="number"
            id="repeatIntervalEvery"
            formControlName="every"
            class="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/3"
          />
          <p class="text-red-500 " *ngIf="isErrorField.every">
            Podaj priorytetr
          </p>
        </div>
      </div>

      <div class="flex items-center justify-center pb-8">
        <button
          (click)="onSubmit()"
          class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          Wyślij
        </button>
      </div>
    </form>
  `,
})
export class AddTaskComponent {
  priorities = [
    { value: 'low', viewValue: 'Niski' },
    { value: 'medium', viewValue: 'Średni' },
    { value: 'high', viewValue: 'Wysoki' },
  ];

  types = [
    { value: 'days', viewValue: 'Dni' },
    { value: 'weeks', viewValue: 'Tygodnie' },
    { value: 'months', viewValue: 'Miesiące' },
    { value: 'years', viewValue: 'lat' },
  ];
  task = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    completed: new FormControl(false),
    dueDate: new FormControl(''),
    priority: new FormControl('low', Validators.required),
    repeats: new FormControl(false),
    type: new FormControl(''),
    every: new FormControl(0),
  });

  erroField: string[] = [];

  isErrorField = {
    title: false,
    priority: false,
    type: false,
    every: false,
  };

  onSubmit() {
    const keysTask: KeyTask[] = ['title', 'priority', 'type', 'every'];

    let isFormValid = true;

    if (!this.task.valid) {
      isFormValid = false;
    }

    if (isFormValid) {
      const taskID = Math.round(Math.random() * 1000);
      const type = this.task.value.repeats ? this.task.value.type : null;
      const every = this.task.value.every;
      delete this.task.value.type;
      delete this.task.value.every;
      const newTask: Task = {
        ...this.task.value,
        id: taskID,
        time: 0,
        repeatInterval: { type, every },
      };
      console.log(newTask);
    } else {
      keysTask.forEach((key) => {
        const isKeyInvalid =
          this.task.get(key)?.invalid && this.task.get(key)?.touched;
        this.isErrorField[key] = !isKeyInvalid ? true : false;
      });
    }
  }
}
