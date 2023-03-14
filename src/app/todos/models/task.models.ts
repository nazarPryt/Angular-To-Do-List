export interface Task extends UpdateTaskModel {
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
}
export interface GetTasksResponse {
  items: Task[];
  error: string;
  totalCount: number;
}

export interface DomainTask {
  [key: string]: Task[];
}

export interface UpdateTaskModel {
  title: string;
  description: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
}
