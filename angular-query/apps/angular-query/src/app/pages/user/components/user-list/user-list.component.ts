import {
  Component,
  inject,
  OnInit
} from '@angular/core';
import { UserService } from '../../services/userService.service';

@Component({
  selector: 'angular-query-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  private userService = inject(UserService)

  // @ts-ignore
  public users$;
  constructor() {}

  ngOnInit(): void {
    this.users$ = this.userService.getUsers().result$;
  }
}
