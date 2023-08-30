import { HttpClient } from '@angular/common/http';
import {
  inject,
  Injectable
} from '@angular/core';
import {
  QueryClientService,
  UseMutation,
  UseQuery
} from '@ngneat/query';
import { QueryObserverResult } from '@tanstack/query-core';
import {
  delay,
  Observable,
  tap
} from 'rxjs';
import { Todo } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private http = inject(HttpClient);
  private queryClient = inject(QueryClientService);
  private useQuery = inject(UseQuery);
  private useMutation = inject(UseMutation);

  getTodos(): Observable<QueryObserverResult<Todo[]>> {
    return this.useQuery(['todos'], () => {
      return this.http.get<Todo[]>(
        'https://jsonplaceholder.typicode.com/todos'
      );
    }).result$;
  }

  getTodosWithOptions(options?: { refetchInterval: number }): Observable<QueryObserverResult<Todo[]>> {
    return this.useQuery(
      ['todos'],
      () => {
        return this.http.get<Todo[]>(
          'https://jsonplaceholder.typicode.com/todos'
        );
      },
      options
    ).result$;
  }

  addTodoOriginal() {
    return this.useMutation(({ title }: { title: string }) => {
      return this.http
        .post<Todo>(`https://jsonplaceholder.typicode.com/todos`, { title })
        .pipe(
          tap((newTodo) => {
            // this is better which basic invalid current query and refetch
            // this.queryClient.invalidateQueries(['todos']);

            // Optimistically update
            const todos = this.queryClient.getQueryData<Todo[]>(['todos']);
            if (todos) {
              this.queryClient.setQueryData<Todo[]>(['todos'], [...todos, newTodo]);
            }
          })
        );
    });
  }

  addTodoBuiltIn({ title }: { title: string }) {
    return this.http
      .post<Todo>(`https://jsonplaceholder.typicode.com/todos`, { title })
      .pipe(
        tap(() => {
          this.queryClient.invalidateQueries(['todos']);
        })
      );
  }

  getTodo(id: number): Observable<QueryObserverResult<Todo>> {
    return this.useQuery(['todo', id], () => {
      return this.http
        .get<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .pipe(delay(1000));
    }).result$;
  }
}
