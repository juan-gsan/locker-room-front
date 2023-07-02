import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Game } from 'src/models/game';
import { ApiResponse } from 'src/types/api.response';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private url = 'http://localhost:9999/game/';
  games$: BehaviorSubject<Game[]>;
  game$: BehaviorSubject<Game>;

  constructor(private http: HttpClient, private userService: UserService) {
    const initialGames: Game[] = [];
    const initialGame: Game = {} as Game;
    this.games$ = new BehaviorSubject(initialGames);
    this.game$ = new BehaviorSubject(initialGame);
  }

  getAllGames(): Observable<Game[]> {
    return this.http
      .get<ApiResponse>(this.url)
      .pipe(map((response) => response.items))
      .pipe(catchError(this.handleError));
  }

  getGame(id: string): Observable<Game> {
    return this.http
      .get<Game>(this.url + id)
      .pipe(catchError(this.handleError));
  }

  createGame(game: FormData) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.userService.token$.value.token
    );
    return this.http
      .post(this.url + 'create', game, { headers })
      .pipe(catchError(this.handleError));
  }

  joinGame(id: string, game: Partial<Game>) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.userService.token$.value.token
    );
    return this.http
      .patch(this.url + id, game, { headers })
      .pipe(catchError(this.handleError));
  }

  editGame(id: string, game: Partial<Game>) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.userService.token$.value.token
    );
    return this.http
      .patch(this.url + 'edit/' + id, game, { headers })
      .pipe(catchError(this.handleError));
  }

  deleteGame(id: string) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.userService.token$.value.token
    );
    return this.http.delete(this.url + id, { headers });
  }
  handleError(error: HttpErrorResponse) {
    return throwError(() => `${error.statusText}`);
  }
}
