import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, map } from 'rxjs';
import { Todo } from '../models/todos.models';
import { CommonResponse } from '../../core/models/core.models';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos$ = new BehaviorSubject<Todo[]>([]);

  constructor(private http: HttpClient) {}

  getTodos() {
    this.http.get<Todo[]>(`${environment.baseUrl}/todo-lists`).subscribe(todos => {
      this.todos$.next(todos);
    });
  }

  addTodo(title: string) {
    this.http
      .post<CommonResponse<{ item: Todo }>>(`${environment.baseUrl}/todo-lists`, { title })
      .pipe(
        map(res => {
          const stateTodos = this.todos$.getValue();
          const newTodo = res.data.item;
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
}
