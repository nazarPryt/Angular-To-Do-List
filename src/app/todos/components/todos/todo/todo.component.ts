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
  @Output() editToDoListEvent = new EventEmitter<{ todoId: string; title: string }>();

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
}
