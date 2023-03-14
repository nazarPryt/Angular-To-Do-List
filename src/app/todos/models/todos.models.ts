export interface Todo {
  id: string;
  title: string;
  addedDate: string;
  order: number;
}

export interface DomainTodo extends Todo {
  filter: FilterType;
}
export type FilterType = 'all' | 'active' | 'completed';
