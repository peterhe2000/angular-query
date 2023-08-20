import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/userService.service';

@Component({
  selector: 'angular-query-user-list-child',
  templateUrl: './user-list-child.component.html',
  styleUrls: ['./user-list-child.component.scss'],
})
export class UserListChildComponent implements OnInit {
  // @ts-ignore
  public users$;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.users$ = this.userService.getUsers().result$;
  }
}
