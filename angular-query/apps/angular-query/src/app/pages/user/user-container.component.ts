import {
  Component,
  inject,
  OnInit
} from '@angular/core';
import { QueryObserverResult } from '@tanstack/query-core';
import {
  forkJoin,
  Observable,
} from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Todo,
  User
} from './models';
import { TodosService } from './services/todos.service';
import { UserService } from './services/userService.service';

@Component({
  selector: 'angular-query-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss'],
})
export class UserContainerComponent implements OnInit {
  private userService = inject(UserService)
  private todosService = inject(TodosService)

  public addTodoMutation$ = this.userService.createUser();
  public addTodoMutation_Result$ = this.addTodoMutation$.result$;
  // @ts-ignore
  public users_Result$:  Observable<QueryObserverResult<User[]>> = this.userService.getUsers();
  public todos_Result$:  Observable<QueryObserverResult<Todo[]>> = this.todosService.getTodos();
  public isLoading$!: Observable<boolean>;
  public isCreatingUser$!: Observable<boolean>;

  constructor() {
  }

  ngOnInit(): void {
    const ui_results$: Observable<[QueryObserverResult<User[]>, QueryObserverResult<Todo[]>]> = forkJoin([
      this.users_Result$,
      this.todos_Result$
    ]).pipe(
      map(([users_Result, todos_Result]) => [users_Result, todos_Result])
    );
    this.isLoading$ = this.getLoading$(ui_results$);
    this.isCreatingUser$ = this.addTodoMutation_Result$.pipe(map(result => result.isLoading));
  }

  // @ts-ignore
  public onAddUser(name) {
    this.addTodoMutation$.mutate({ name }).then((res) => {
      console.log(res);
    });
  }

  private getLoading$(ui_results$: Observable<[QueryObserverResult<User[]>, QueryObserverResult<Todo[]>]>) {
    return ui_results$.pipe(map(([users_Result, todos_Result]) => users_Result.isLoading || todos_Result.isLoading));
  }
}
