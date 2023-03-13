import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './components/todos/todos.component';
import { TodosRoutingModule } from './todos-routing.module';
import { TodoComponent } from './components/todos/todo/todo.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TodosComponent, TodoComponent],

  imports: [CommonModule, TodosRoutingModule, FormsModule],
})
export class TodosModule {}
