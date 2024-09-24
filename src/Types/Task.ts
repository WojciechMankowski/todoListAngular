export interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    dueDate: Date | undefined;
    time: number
    priority: 'low' | 'medium' | 'high';
    repeats: boolean;
    repeatInterval?: {
      type: 'days' | 'weeks' | 'months' | 'years';
      every: number;
    };
  }