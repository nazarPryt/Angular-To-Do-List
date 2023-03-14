import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterType } from '../../../../models/todos.models';

@Component({
  selector: 'todo-todo-filters',
  templateUrl: './todo-filters.component.html',
  styleUrls: ['./todo-filters.component.scss'],
})
export class TodoFiltersComponent {
  @Input() filter!: FilterType;
  @Output() changeFilterEvent = new EventEmitter<FilterType>();

  changeFilterHandler(filter: FilterType) {
    this.changeFilterEvent.emit(filter);
  }
}
