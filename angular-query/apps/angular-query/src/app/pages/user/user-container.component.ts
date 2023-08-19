import { Component, OnInit } from '@angular/core';
import { UserService } from './services/userService.service';

@Component({
  selector: 'angular-query-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss'],
})
  export class UserContainerComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {

  }
}
