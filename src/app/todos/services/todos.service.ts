import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, map } from 'rxjs';
import { DomainTodo, FilterType, Todo } from '../models/todos.models';
import { CommonResponse } from '../../core/models/core.models';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos$ = new BehaviorSubject<DomainTodo[]>([]);

  constructor(private http: HttpClient) {}

  getTodos() {
    this.http
      .get<Todo[]>(`${environment.baseUrl}/todo-lists`)
      .pipe(
        map(todos => {
          const newTodos: DomainTodo[] = todos.map(tl => ({ ...tl, filter: 'all' }));
          return newTodos;
        })
      )
      .subscribe(todos => {
        this.todos$.next(todos);
      });
  }

  addTodo(title: string) {
    this.http
      .post<CommonResponse<{ item: Todo }>>(`${environment.baseUrl}/todo-lists`, { title })
      .pipe(
        map(res => {
          const stateTodos = this.todos$.getValue();
          const newTodo: DomainTodo = { ...res.data.item, filter: 'all' };
          return [newTodo, ...stateTodos];
        })
      )
      .subscribe(todo => {
        this.todos$.next(todo);
      });
  }

  removeTodo(todoId: string) {
    this.http
      .delete<CommonResponse>(`${environment.baseUrl}/todo-lists/${todoId}`)
      .pipe(
        map(() => {
          const stateTodos = this.todos$.getValue();
          return stateTodos.filter(tl => tl.id !== todoId);
        })
      )
      .subscribe(todo => {
        this.todos$.next(todo);
      });
  }

  updateTodoTitle(data: { todoId: string; title: string }) {
    this.http
      .put<CommonResponse>(`${environment.baseUrl}/todo-lists/${data.todoId}`, { title: data.title })
      .pipe(
        map(() => {
          const stateTodos = this.todos$.getValue();
          return stateTodos.map(tl => (tl.id === data.todoId ? { ...tl, title: data.title } : tl));
        })
      )
      .subscribe(todo => {
        this.todos$.next(todo);
      });
  }

  changeFilter(data: { filter: FilterType; todoId: string }) {
    const stateTodos = this.todos$.getValue();
    const newTodos = stateTodos.map(td => (td.id === data.todoId ? { ...td, filter: data.filter } : td));
    this.todos$.next(newTodos);
  }
}
