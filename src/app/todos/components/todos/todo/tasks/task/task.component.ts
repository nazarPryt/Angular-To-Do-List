import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../../../models/task.models';

@Component({
  selector: 'todo-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task!: Task;
  @Output() removeTaskEvent = new EventEmitter<{ taskId: string; todoId: string }>();

  removeTaskHandler() {
    this.removeTaskEvent.emit({ taskId: this.task.id, todoId: this.task.todoListId });
  }
}
