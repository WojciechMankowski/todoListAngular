import { Injectable } from '@angular/core';
import { Task } from '../Types/Task';
import numerals from './Numerals';
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

    const { type, every } = task.repeatInterval;

    const forms = {
      days: ['dzień', 'dni'],
      weeks: ['tydzień', 'tygodnie'],
      months: ['miesiąc', 'miesiące'],
    };
    const numeralsDict: { [key: number]: string } = numerals;
    const everyInPolish = numeralsDict[every] || 'nieznany';

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
  // formatRepeatInterval(task: Task): string | undefined {
  //   if (!task.repeats || !task.repeatInterval) {
  //     return undefined;
  //   }

  //   const { type, every } = task.repeatInterval;

  //   const forms = {
  //     days: ['dzień', 'dni'],
  //     weeks: ['tydzień', 'tygodnie'],
  //     months: ['miesiąc', 'miesiące'],
  //   };
  //   const numeralsDict: { [key: number]: string } = numerals;
  //   const everyInPolish = numeralsDict[every] || 'nieznany';

  //   const getForm = (count: number, [singular, plural]: string[]): string =>
  //     count === 1 ? singular : plural;

  //   switch (type) {
  //     case 'days':
  //       return `co ${everyInPolish} ${getForm(every, forms.days)}`;
  //     case 'weeks':
  //       if (every === 1) {
  //         return `raz w ${getForm(every, forms[type])} `;
  //       }
  //       return `${everyInPolish} na ${getForm(every, forms[type])} `;
  //     case 'months':
  //       return ` na ${everyInPolish} ${getForm(every, forms[type])}`;
  //     default:
  //       return 'Nieznany interwał';
  //   }
  // }
}
