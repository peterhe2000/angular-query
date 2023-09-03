import {
  Component,
  inject,
  OnInit
} from '@angular/core';
import { QueryObserverResult } from '@tanstack/query-core';
import { Observable } from 'rxjs';
import {
  Post,
  User
} from '../../models';
import {
  PostsService
} from '../../services/posts.service';
import { UserService } from '../../services/userService.service';

@Component({
  selector: 'angular-query-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  private userService = inject(UserService)
  private postsService = inject(PostsService)

  public users_Result$:  Observable<QueryObserverResult<User[]>> = this.userService.getUsers();
  public posts_Result$: Observable<QueryObserverResult<Post[]>> = this.postsService.getPosts();

  constructor() {}

  ngOnInit(): void {}
}
