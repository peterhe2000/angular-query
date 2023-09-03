import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UseQuery } from '@ngneat/query';
import { NgQueryObserverOptions } from '@ngneat/query/lib/query';
import { QueryObserverResult } from '@tanstack/query-core';
import { Observable, OperatorFunction } from 'rxjs';
import { Post } from '../models';

type UseQueryOptionsPosts =
  | (Omit<
      NgQueryObserverOptions<Post[], unknown, Post[], Post[], string[]>,
      'queryFn' | 'queryKey' | 'initialData'
    > & { initialData?: (() => undefined) | undefined })
  | undefined;

type UseQueryOptionsPost =
  | (Omit<
      NgQueryObserverOptions<Post, unknown, Post, Post, string[]>,
      'queryFn' | 'queryKey' | 'initialData'
    > & { initialData?: (() => undefined) | undefined })
  | undefined;

function withRxjsOperators<T>(operators: OperatorFunction<T, T>[]) {
  return (fn: () => Observable<T>) =>
    operators.reduce((acc, curr) => acc.pipe(curr), fn());
}

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private http = inject(HttpClient);
  private useQuery = inject(UseQuery);

  getPosts(): Observable<QueryObserverResult<Post[]>> {
    return this.useQuery(['posts'], () => {
      return this.http.get<Post[]>(
        'https://jsonplaceholder.typicode.com/posts'
      );
    }).result$;
  }

  getAll(
    options?: UseQueryOptionsPosts,
    ...operators: OperatorFunction<Post[], Post[]>[]
  ) {
    return this.useQuery(
      ['posts'],
      () => {
        return withRxjsOperators(operators)(() =>
          this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
        );
      },
      options
    );
  }

  get(
    id: number,
    options?: UseQueryOptionsPost,
    ...operators: OperatorFunction<Post, Post>[]
  ) {
    return this.useQuery(
      ['post', String(id)],
      () => {
        return withRxjsOperators(operators)(() =>
          this.http.get<Post>(
            `https://jsonplaceholder.typicode.com/posts/${id}`
          )
        );
      },
      options
    );
  }
}
