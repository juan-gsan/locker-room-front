import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
  currentUserId: string | undefined;
  constructor(private http: HttpClient, private userService: UserService) {
    const initialGames: Game[] = [];
    const initialGame: Game = {} as Game;
    this.games$ = new BehaviorSubject(initialGames);
    this.game$ = new BehaviorSubject(initialGame);
    this.userService.token$.subscribe(
      (id) => (this.currentUserId = id.user.id)
    );
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

  createGame(game: Partial<Game>) {
    return this.http
      .post<Game>(this.url + this.currentUserId, game)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => `${error.statusText}`);
  }
}
