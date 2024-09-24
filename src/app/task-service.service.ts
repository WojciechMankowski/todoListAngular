import { Injectable } from '@angular/core';
import { Task } from '../Types/Task';
import ErrorType from '../Types/errorType';
import { wait } from './wait';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly URL = 'http://localhost:3000/';

  async getALL() {
    wait();
    return fetch(`${this.URL}tasks`).then<Task[] | ErrorType>((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return {
          status: response.status,
          message: response.statusText,
        };
      }
    });
  }
  async updateStatus(id: number, completed: boolean) {
    return fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: completed }),
    }).then<Task | Error>((response) => {
      if (response.ok) {
        return response.json();
      }
      return Error('Cant update task');
    });
  }
}
