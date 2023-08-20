import {
  Component,
  inject,
  OnInit
} from '@angular/core';
import { UserService } from '../../services/userService.service';

@Component({
  selector: 'angular-query-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  private userService = inject(UserService)
  addTodoMutation$ = this.userService.createUser();
  public name = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  // @ts-ignore
  public onAddUser(name) {
    this.addTodoMutation$.mutate({ name }).then((res) => {
      console.log(res.success);
    });
  }
}
