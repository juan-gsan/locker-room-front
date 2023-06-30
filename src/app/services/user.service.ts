import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { User } from 'src/models/user';
import { Token } from 'src/types/token';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:9999/user';
  token$: BehaviorSubject<Token>;

  constructor(private http: HttpClient) {
    const initialToken = { token: '', user: {} };
    this.token$ = new BehaviorSubject(initialToken);
  }

  userRegister(user: FormData): Observable<User> {
    return this.http
      .post<User>(this.url + '/register', user)
      .pipe(catchError(this.handleError));
  }

  userLogin(user: Partial<User>): Observable<Token> {
    return this.http
      .patch<Token>(this.url + '/login', user)
      .pipe(catchError(this.handleError));
  }

  // userLogout(): void {
  //   this.token$.subscribe()
  // }

  handleError(error: HttpErrorResponse) {
    return throwError(() => `${error.statusText}`);
  }
}
