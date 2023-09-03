import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { QueryObserverResult } from '@tanstack/query-core';
import {
  combineLatest,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'angular-query-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss'],
})
export class UserContainerComponent implements OnInit {
  private userService = inject(UserService)
  private todosService = inject(TodosService)
  private addUserMutation$ = this.userService.addUser();
  private addTodoMutation$ = this.todosService.addTodoOriginal();

  public allSuccess$!: Observable<boolean>;
  public users_Result$: Observable<QueryObserverResult<User[]>> = this.userService.getUsers();
  public todos_Result$: Observable<QueryObserverResult<Todo[]>> = this.todosService.getTodos();
  public isLoading$!: Observable<boolean>;
  public isAddingTodo$!: Observable<boolean>;
  public isAddingUser$!: Observable<boolean>;
  public addUserMutation_Result$ = this.addUserMutation$.result$;
  public addTodoMutation_Result$ = this.addTodoMutation$.result$;

  constructor() {
  }

  ngOnInit(): void {
    this.isLoading$ = this.getLoading$(this.users_Result$, this.todos_Result$);
    this.isAddingTodo$ = this.addTodoMutation_Result$.pipe(map(result => result.isLoading));
    this.isAddingUser$ = this.addUserMutation_Result$.pipe(map(result => result.isLoading));
    this.allSuccess$ = this.getAllSuccess$(this.users_Result$, this.todos_Result$);
  }

  // @ts-ignore
  public onAddUser(name) {
    this.addUserMutation$.mutate({ name }).then((res) => {
      console.log(res);
    });
  }

  public onAddTodo() {
    this.addTodoMutation$.mutate({ title: 'foo' }).then((res) => {
      console.log(res);
    });
  }

  private getLoading$(users_Result$: Observable<QueryObserverResult<User[]>>, todos_Result$: Observable<QueryObserverResult<Todo[]>>) {
    return combineLatest([
      users_Result$,
      todos_Result$]
    ).pipe(
      map(([users_Result, todos_Result]) => {
        return users_Result.isLoading || todos_Result.isLoading;
      })
    )
  }

  private getAllSuccess$(users_Result$: Observable<QueryObserverResult<User[]>>, todos_Result$: Observable<QueryObserverResult<Todo[]>>) {
    return combineLatest([
      users_Result$,
      todos_Result$]
    ).pipe(
      map(([users_Result, todos_Result]) => {
        return users_Result.isSuccess && todos_Result.isSuccess;
      })
    )
  }

}
