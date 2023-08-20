import {
  Component,
  inject,
  OnInit
} from '@angular/core';
import { QueryObserverResult } from '@tanstack/query-core';
import { Observable, } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './models/user';
import { UserService } from './services/userService.service';

@Component({
  selector: 'angular-query-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss'],
})
export class UserContainerComponent implements OnInit {
  private userService = inject(UserService)

  public addTodoMutation$ = this.userService.createUser();
  public addTodoMutation_Result$ = this.addTodoMutation$.result$;
  // @ts-ignore
  public users_Result$:  Observable<QueryObserverResult<{users: User[]}, unknown>>;
  public isLoadingUser$!: Observable<boolean>;
  public isCreatingUser$!: Observable<boolean>;

  constructor() {
  }

  ngOnInit(): void {
    this.users_Result$ = this.userService.getUsers().result$;
    this.isLoadingUser$ = this.users_Result$.pipe(map(result => result.isLoading));
    this.isCreatingUser$ = this.addTodoMutation_Result$.pipe(map(result => result.isLoading));
  }

  // @ts-ignore
  public onAddUser(name) {
    this.addTodoMutation$.mutate({ name }).then((res) => {
      console.log(res);
    });
  }
}
