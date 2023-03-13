import { Component, Input, OnInit } from '@angular/core';
import { TasksService } from '../../../../services/tasks.service';
import { map, Observable } from 'rxjs';
import { Task } from 'src/app/todos/models/task.models';

@Component({
  selector: 'todo-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  @Input() todoId!: string;

  tasks$?: Observable<Task[]>;
  taskTitle!: '';

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasks$ = this.tasksService.tasks$.pipe(
      map(tasks => {
        return tasks[this.todoId];
      })
    );
    this.tasksService.getTasks(this.todoId);
  }

  addTaskHandler() {
    this.tasksService.addTask({ title: this.taskTitle, todoId: this.todoId });
    this.taskTitle = '';
  }

  removeTask(data: { taskId: string; todoId: string }) {
    this.tasksService.removeTask(data);
  }
}
