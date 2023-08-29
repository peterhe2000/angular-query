import {
  Component,
  inject,
  OnInit
} from '@angular/core';
import { QueryObserverResult } from '@tanstack/query-core';
import { Observable } from 'rxjs';
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

  public users_Result$: Observable<QueryObserverResult<User[]>> = this.userService.getUsers();
  public todos_Result$: Observable<QueryObserverResult<Todo[]>> = this.todosService.getTodos();

  constructor() {
  }

  ngOnInit(): void {
  }
}
