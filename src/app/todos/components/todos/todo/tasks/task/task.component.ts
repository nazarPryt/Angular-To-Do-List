import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, UpdateTaskModel } from '../../../../../models/task.models';
import { TaskStatusEnum } from '../../../../../../core/enums/taskStatus.enum';

@Component({
  selector: 'todo-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task!: Task;
  @Output() removeTaskEvent = new EventEmitter<{ taskId: string; todoId: string }>();
  @Output() changeTaskEvent = new EventEmitter<{ taskId: string; todoId: string; model: UpdateTaskModel }>();

  taskStatusEnum = TaskStatusEnum;

  newTitle = '';
  editMode = false;

  removeTaskHandler() {
    this.removeTaskEvent.emit({ taskId: this.task.id, todoId: this.task.todoListId });
  }

  changeTaskStatusHandler(event: MouseEvent) {
    const newStatus = (event.currentTarget as HTMLInputElement).checked;
    this.changeTask({ status: newStatus ? TaskStatusEnum.completed : TaskStatusEnum.active });
  }

  activateEditModeHandler() {
    this.editMode = true;
    this.newTitle = this.task.title;
  }

  editTitleHandler() {
    this.changeTask({ title: this.newTitle });
    this.newTitle = '';
    this.editMode = false;
  }
  changeTask(patch: Partial<UpdateTaskModel>) {
    const model: UpdateTaskModel = {
      completed: this.task.completed,
      deadline: this.task.deadline,
      description: this.task.description,
      priority: this.task.priority,
      startDate: this.task.addedDate,
      status: this.task.status,
      title: this.task.title,
      ...patch,
    };
    this.changeTaskEvent.emit({ taskId: this.task.id, todoId: this.task.todoListId, model });
  }
}
