import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit
} from '@angular/core';
import {
  MutationObserverResult,
  QueryObserverResult
} from '@tanstack/query-core';
import {
  combineLatest,
  forkJoin,
  Observable,
} from 'rxjs';
import {
  map,
  takeUntil
} from 'rxjs/operators';
import { AbstractConnectableComponent } from '../../shared/components/abstract-connectable';
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
export class UserContainerComponent extends AbstractConnectableComponent implements OnInit {
  private userService = inject(UserService)
  private todosService = inject(TodosService)

  private users_Result$: Observable<QueryObserverResult<User[]>> = this.userService.getUsers();
  private todos_Result$: Observable<QueryObserverResult<Todo[]>> = this.todosService.getTodos();
  private addTodoMutation$ = this.userService.createUser();

  public addTodoMutation_Result$ = this.addTodoMutation$.result$;
  // @ts-ignore
  public addTodoMutation;
  public users_Result! : QueryObserverResult<User[]>;
  public todos_Result! : QueryObserverResult<Todo[]>;
  public isLoading!: boolean;
  public isCreatingUser!: boolean;

  constructor(
    public override cdr: ChangeDetectorRef,
  ) {
    super(cdr);
  }

  ngOnInit(): void {
    this.connect<UserContainerComponent>({
      addTodoMutation: this.addTodoMutation$.result$,
      users_Result: this.users_Result$,
      todos_Result: this.todos_Result$,
      isLoading: this.getLoading$(this.users_Result$, this.todos_Result$),
      isCreatingUser: this.addTodoMutation_Result$.pipe(map(result => result.isLoading))
    })
  }

  // @ts-ignore
  public onAddUser(name) {
    this.addTodoMutation$.mutate({ name }).then((res) => {
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
}
