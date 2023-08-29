import {
  inject,
  Inject,
  Injectable,
  InjectionToken
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  addEntity,
  QueryClientService,
  UseMutation,
  UseQuery
} from '@ngneat/query';
import { QueryObserverResult } from '@tanstack/query-core';
import { Observable } from 'rxjs';
import {
  map,
  tap
} from 'rxjs/operators';
import { User } from '../models';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private queryClient = inject(QueryClientService);
  private useMutation = inject(UseMutation);

  constructor(
    private http: HttpClient,
    private useQuery: UseQuery,
    @Inject(API_BASE_URL) private baseUrl?: string
  ) {
  }

  public getUsers(): Observable<QueryObserverResult<User[]>> {
    let url = `${this.baseUrl}users`
    return this.useQuery(['users'], () => {
      return this.http.get<User[]>(url);
    }).result$;
  }

  getUserById(userId: number) {
    const users_Result$ = this.getUsers();
    return users_Result$.pipe(map(r => r?.data?.find(u => u.id === userId) ?? null));
    // let url = `${this.baseUrl}users/${userId}`;
    // return this.useQuery(['user', userId], () => {
    //   return this.http.get<{ users: User[] }>(
    //     url
    //   );
    // });
  }

  addUser() {
    return this.useMutation(({ name }: { name: string }) => {
      let url = `${this.baseUrl}users`;
      const newUser: User = { id: null, name: name };
      return this.http.post<{ success: boolean }>(url, newUser).pipe(
        tap((newName) => {
          this.queryClient.invalidateQueries(['users']);
        })
      );
    })
  }

  // getUsers(isOdd: boolean = false): Observable<User[]> {
  //   let url = `${this.baseUrl}users`;
  //   if (isOdd) {
  //     url = `${url}?isodd=${true}`;
  //   }
  //   return this.http
  //     .get<{ users: User[] }>(url)
  //     .pipe(map((usersData) => usersData.users || []));
  // }

  // getUsers(isOdd: boolean = false): Observable<User[]> {
  //   let url = `${this.baseUrl}users`;
  //   if (isOdd) {
  //     url = `${url}?isodd=${true}`;
  //   }
  //   return this.http
  //     .get<{ users: User[] }>(url)
  //     .pipe(map((usersData) => usersData.users || []));
  // }
  //
  // getUserById(userId: number): Observable<User> {
  //   let url = `${this.baseUrl}users/${userId}`;
  //   return this.http.get<User>(url);
  // }
  //
  // createUser(name: string): Observable<User> {
  //   let url = `${this.baseUrl}users`;
  //   const newUser: User = { id: null, name: name };
  //   return this.http
  //     .post<{ user: User }>(url, newUser)
  //     .pipe(map((userData) => userData.user));
  // }
  //
  // updateUser(user: User, userId: number): Observable<User> {
  //   let url = `${this.baseUrl}users/${userId}`;
  //   return this.http
  //     .put<{ user: User }>(url, { name: user.name })
  //     .pipe(map((userData) => userData.user));
  // }
  //
  // deleteUser(userId: number) {
  //   let url = `${this.baseUrl}users/${userId}`;
  //   return this.http.delete(url);
  // }
}
