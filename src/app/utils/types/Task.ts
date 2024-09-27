export interface Task {
    id?: number;
    title?: string | null | undefined;
    description?: string | null;
    completed?: boolean | null | undefined;
    dueDate?: Date | undefined | null | string;
    time?: number | null
    priority?: String |  null;
    repeats?: boolean | null;
    repeatInterval?: {
      type: 'days' | 'weeks' | 'months' | 'years' | null | undefined | string;
      every: number | null | undefined;
    };
  }