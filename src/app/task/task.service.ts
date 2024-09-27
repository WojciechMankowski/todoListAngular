import { Injectable } from '@angular/core';
import { Task } from '../utils/types/Task';
import numerals from '../utils/Numerals';
@Injectable({
  providedIn: 'root',
})

export class TaskService {
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
  getInfoRepeats(task: Task): string | undefined {
    if (!task.repeats || !task.repeatInterval) {
      return undefined;
    }

    const type = task.repeatInterval.type;
    const every = task.repeatInterval.every as number;
    const forms = {
      days: ['dzień', 'dni'],
      weeks: ['tydzień', 'tygodnie'],
      months: ['miesiąc', 'miesiące'],
    };
    const numeralsDict: { [key: number]: string } = numerals;
    let everyInPolish = numeralsDict[every] || 'nieznany';

    const getForm = (count: number, [singular, plural]: string[]): string =>
      count === 1 ? singular : plural;

    switch (type) {
      case 'days':
        return `co ${everyInPolish} ${getForm(every, forms.days)}`;
      case 'weeks':
        if (every === 1) {
          return `raz w tygodniu`;
        }
        return `${everyInPolish} na ${getForm(every, forms[type])} `;
      case 'months':
        if (every === 1) {
          return `raz w miesiącu`;
        }
        return ` ${everyInPolish} w ${getForm(every, forms[type])}`;
      default:
        return 'Nieznany interwał';
    }
  }
}
