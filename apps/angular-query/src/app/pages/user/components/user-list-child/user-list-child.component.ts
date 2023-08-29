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
  selector: 'angular-query-user-list-child',
  templateUrl: './user-list-child.component.html',
  styleUrls: ['./user-list-child.component.scss'],
})
export class UserListChildComponent implements OnInit {
  private userService = inject(UserService)

  public users_Result$:  Observable<QueryObserverResult<User[]>> = this.userService.getUsers();
  constructor() {}

  ngOnInit(): void {
  }
}
