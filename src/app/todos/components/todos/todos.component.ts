import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Observable } from 'rxjs';
import { DomainTodo } from '../../models/todos.models';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'todo-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos$?: Observable<DomainTodo[]>;
  todoTitle = '';

  constructor(private todosService: TodosService, private authService: AuthService) {}

  ngOnInit(): void {
    this.todosService.getTodos();
    this.todos$ = this.todosService.todos$;
  }
  addTodoHandler() {
    this.todosService.addTodo(this.todoTitle);
    this.todoTitle = '';
  }

  removeTodo(todoId: string) {
    this.todosService.removeTodo(todoId);
  }

  editTodo(data: { todoId: string; title: string }) {
    this.todosService.updateTodoTitle(data);
  }

  logOutHandler() {
    this.authService.logOut();
  }
}
