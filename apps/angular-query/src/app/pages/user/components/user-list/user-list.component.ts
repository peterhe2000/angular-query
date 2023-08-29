import {
  Component,
  inject,
  OnInit
} from '@angular/core';
import { QueryObserverResult } from '@tanstack/query-core';
import { Observable } from 'rxjs';
import { User } from '../../models';
import { UserService } from '../../services/userService.service';

@Component({
  selector: 'angular-query-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  private userService = inject(UserService)

  public users_Result$:  Observable<QueryObserverResult<User[]>> = this.userService.getUsers();
  constructor() {}

  ngOnInit(): void {}
}
