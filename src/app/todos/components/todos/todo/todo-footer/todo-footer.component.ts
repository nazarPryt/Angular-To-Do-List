import { Component, Input } from '@angular/core';

@Component({
  selector: 'todo-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.scss'],
})
export class TodoFooterComponent {
  @Input() addedDate!: string;
}
