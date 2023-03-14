import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, map } from 'rxjs';
import { DomainTask, GetTasksResponse, Task, UpdateTaskModel } from '../models/task.models';
import { CommonResponse } from '../../core/models/core.models';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks$ = new BehaviorSubject<DomainTask>({});

  constructor(private http: HttpClient) {}

  getTasks(todoId: string) {
    return this.http
      .get<GetTasksResponse>(`${environment.baseUrl}/todo-lists/${todoId}/tasks`)
      .pipe(map(res => res.items))
      .subscribe(tasks => {
        const stateTasks = this.tasks$.getValue();
        stateTasks[todoId] = tasks;
        this.tasks$.next(stateTasks);
      });
  }

  addTask(data: { todoId: string; title: string }) {
    return this.http
      .post<CommonResponse<{ item: Task }>>(`${environment.baseUrl}/todo-lists/${data.todoId}/tasks`, {
        title: data.title,
      })
      .pipe(
        map(res => {
          const stateTasks = this.tasks$.getValue();
          const newTask = res.data.item;
          stateTasks[data.todoId] = [newTask, ...stateTasks[data.todoId]];
          return stateTasks;
        })
      )
      .subscribe(tasks => {
        this.tasks$.next(tasks);
      });
  }

  removeTask(data: { taskId: string; todoId: string }) {
    return this.http
      .delete<CommonResponse>(`${environment.baseUrl}/todo-lists/${data.todoId}/tasks/${data.taskId}`)
      .pipe(
        map(() => {
          const stateTasks = this.tasks$.getValue();
          const tasksForTodo = stateTasks[data.todoId];
          stateTasks[data.todoId] = tasksForTodo.filter(task => task.id !== data.taskId);
          return stateTasks;
        })
      )
      .subscribe(tasks => {
        this.tasks$.next(tasks);
      });
  }

  updateTask(data: { todoId: string; taskId: string; model: UpdateTaskModel }) {
    this.http
      .put<CommonResponse>(`${environment.baseUrl}/todo-lists/${data.todoId}/tasks/${data.taskId}`, data.model)
      .pipe(
        map(() => {
          const stateTasks = this.tasks$.getValue();
          const tasksForTodo = stateTasks[data.todoId];
          stateTasks[data.todoId] = tasksForTodo.map(task =>
            task.id === data.taskId ? { ...task, ...data.model } : task
          );
          return stateTasks;
        })
      )
      .subscribe(tasks => {
        this.tasks$.next(tasks);
      });
  }
}
