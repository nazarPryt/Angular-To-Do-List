import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../../models/todos.models';

@Component({
  selector: 'todo-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @Input() todo!: Todo;
  @Output() removeToDoListEvent = new EventEmitter<string>();

  removeToDoListHandler() {
    this.removeToDoListEvent.emit(this.todo.id);
  }
}
