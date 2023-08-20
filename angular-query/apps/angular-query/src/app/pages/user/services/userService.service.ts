import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UseQuery } from '@ngneat/query';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private useQuery: UseQuery,
    @Inject(API_BASE_URL) private baseUrl?: string
  ) {}

  public getUsers(isOdd: boolean = false) {
    let url = `${this.baseUrl}users`
    if (isOdd) {
      url = `${url}?isodd=${true}`;
    }
    return this.useQuery(['todos'], () => {
      return this.http.get<{ users: User[] }>(
        url
      );
    });
  }

  getUserById(userId: number) {
    let url = `${this.baseUrl}users/${userId}`;
    return this.useQuery(['todo', userId], () => {
      return this.http.get<{ users: User[] }>(
        url
      );
    });
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
