import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/userService.service';

@Component({
  selector: 'angular-query-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  // @ts-ignore
  public users$;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.users$ = this.userService.getUsers().result$;
  }
}
