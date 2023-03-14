import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomainTodo, FilterType } from '../../../models/todos.models';
import { TodosService } from '../../../services/todos.service';

@Component({
  selector: 'todo-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @Input() todo!: DomainTodo;
  @Output() removeToDoListEvent = new EventEmitter<string>();
  @Output() editToDoListEvent = new EventEmitter<{ todoId: string; title: string }>();

  constructor(private todosService: TodosService) {}
  isEditMode = false;
  newTitle = '';

  removeToDoListHandler() {
    this.removeToDoListEvent.emit(this.todo.id);
  }
  activateEditMode() {
    this.newTitle = this.todo.title;
    this.isEditMode = true;
  }

  editTitleHandler() {
    this.isEditMode = false;
    this.editToDoListEvent.emit({ todoId: this.todo.id, title: this.newTitle });
  }

  changeFilter(filter: FilterType) {
    this.todosService.changeFilter({ filter, todoId: this.todo.id });
  }
}
