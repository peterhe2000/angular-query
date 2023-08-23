import {
  Component,
  inject,
  OnInit
} from '@angular/core';
import { QueryObserverResult } from '@tanstack/query-core';
import {
  forkJoin,
  Observable
} from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Todo,
  User
} from '../../models';
import { TodosService } from '../../services/todos.service';
import { UserService } from '../../services/userService.service';

@Component({
  selector: 'angular-query-user-list-child-child',
  templateUrl: './user-list-child-child.component.html',
  styleUrls: ['./user-list-child-child.component.scss'],
})
export class UserListChildChildComponent implements OnInit {
  private userService = inject(UserService)
  private todosService = inject(TodosService)

  public users_Result$:  Observable<QueryObserverResult<User[]>> = this.userService.getUsers();
  public todos_Result$:  Observable<QueryObserverResult<Todo[]>> = this.todosService.getTodos();

  constructor() {}

  ngOnInit(): void {
    const ui_results$: Observable<[QueryObserverResult<User[]>, QueryObserverResult<Todo[]>]> = forkJoin([
      this.users_Result$,
      this.todos_Result$
    ]).pipe(
      map(([users_Result, todos_Result]) => [users_Result, todos_Result])
    );
  }
}
