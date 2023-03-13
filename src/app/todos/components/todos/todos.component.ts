import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todos.models';

@Component({
  selector: 'todo-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos$?: Observable<Todo[]>;

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.todosService.getTodos();
    this.todos$ = this.todosService.todos$;
  }
}
