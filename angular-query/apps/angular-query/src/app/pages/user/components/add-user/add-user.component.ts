import { Component, OnInit } from '@angular/core';
import { useMutationResult } from '@ngneat/query';
import { UserService } from '../../services/userService.service';

@Component({
  selector: 'angular-query-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  addTodoMutation = useMutationResult();
  public name = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  // @ts-ignore
  public onAddUser(name) {
    this.userService.createUser({ name })
      .pipe(this.addTodoMutation.track())
      .subscribe();
  }
}
