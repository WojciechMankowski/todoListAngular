import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, NgIf],
  template: `
    <form class="space-y-4">
      <div class="flex flex-col">
        <label class="text-gray-700 font-bold mb-2">Tytuł:</label>
        <input
          type="text"
          class="border rounded px-4 py-2"
          name="title"
          required
        />
      </div>

      <div class="flex flex-col">
        <label class="text-gray-700 font-bold mb-2">Opis:</label>
        <textarea
          class="border rounded px-4 py-2"
          name="description"
        ></textarea>
      </div>

      <div class="flex flex-col">
        <label class="text-gray-700 font-bold mb-2">Termin:</label>
        <input type="date" class="border rounded px-4 py-2" name="dueDate" />
      </div>

      <div class="flex flex-col">
        <label class="text-gray-700 font-bold mb-2">Priorytet:</label>
        <select class="border rounded px-4 py-2" name="priority">
          <option value="low">Niski</option>
          <option value="medium">Średni</option>
          <option value="high">Wysoki</option>
        </select>
      </div>

      <div class="flex flex-row">
        <label class="text-gray-700 font-bold mb-2 pr-8">Powtarza się:</label>
        <input
          type="checkbox"
          class="border rounded px-4 py-2"
          name="repeats"
          [(ngModel)]="isRepeats"
          (click)="repeats()"
        />
      </div>

      <div class="flex flex-col" id="repeatInterval" *ngIf="isRepeats">
        <label class="text-gray-700 font-bold mb-2">Powtarzaj co:</label>

        <div class="flex space-x-2">
          <input
            type="number"
            class="border rounded px-4 py-2"
            name="repeatInterval.every"
          />
          <select class="border rounded px-4 py-2" name="repeatInterval.type">
            <option value="days">Dni</option>
            <option value="weeks">Tygodnie</option>
            <option value="months">Miesiące</option>
            <option value="years">Lata</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
      >
        Wyślij
      </button>
    </form>
  `,
  styles: ``,
})
export class AddTaskComponent {
  isRepeats = false;
  repeats() {
    this.isRepeats = !this.isRepeats;
  }

  addTask(){}
}
