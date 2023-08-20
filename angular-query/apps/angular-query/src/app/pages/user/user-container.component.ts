import {
  Component,
  inject,
  OnInit
} from '@angular/core';
import { UserService } from './services/userService.service';

@Component({
  selector: 'angular-query-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss'],
})
export class UserContainerComponent implements OnInit {
  // @ts-ignore
  public users$;
  private userService = inject(UserService)

  constructor() {
  }

  ngOnInit(): void {
    this.users$ = this.userService.getUsers().result$;
  }
}
