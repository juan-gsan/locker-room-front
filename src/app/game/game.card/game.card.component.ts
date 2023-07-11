import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { first, switchMap, tap } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
import { UserService } from 'src/app/services/user.service';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game.card',
  templateUrl: './game.card.component.html',
  styleUrls: ['./game.card.component.scss'],
})
export class GameCardComponent implements OnInit {
  game: Game = {} as Game;
  params: Params = { id: '' };
  isLogged = false;
  isOwner = false;
  isJoined = false;
  constructor(
    public gameService: GameService,
    public userService: UserService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.params = params));
    this.loadGameCard(this.params['id']);
  }

  loadGameCard(id: string) {
    this.gameService.getGame(id).subscribe((game) => {
      this.game = game;

      this.gameService.game$.next(game);
      this.checkToken();
      this.checkOwner();
      this.checkJoined();
    });
  }

  checkToken() {
    this.userService.token$.subscribe((token) => {
      if (token.token) {
        this.isLogged = true;
      }
    });
  }

  checkOwner() {
    this.userService.token$.subscribe((token) => {
      this.gameService.game$.subscribe((game) => {
        if (token.user.id === game.owner.id) {
          this.isOwner = true;
        }
      });
    });
  }

  checkJoined() {
    this.userService.token$.subscribe((token) => {
      this.gameService.game$.subscribe((game) => {
        for (let i = 0; i < game.players.length; i++) {
          if (game.players[i].id === token.user.id) {
            this.isJoined = true;
          }
        }
      });
    });
  }

  handleJoin() {
    this.gameService.game$
      .pipe(
        first(),
        switchMap((game) => {
          game.players.push(this.userService.token$.value.user);
          game.spotsLeft -= 1;

          return this.gameService.joinGame(game.id, game);
        })
      )
      .subscribe(() => {
        this.isJoined = true;
        this.router.navigateByUrl('/game/' + this.game.id);
      });
  }

  handleEdit() {
    this.router.navigateByUrl('/game/edit/' + this.game.id);
  }

  handleLeave() {
    this.gameService.game$
      .pipe(
        first(),
        switchMap((game) => {
          game.players = game.players.filter((player) => {
            return player.id !== this.userService.token$.value.user.id;
          });
          game.spotsLeft += 1;
          return this.gameService.leaveGame(game.id, game);
        })
      )
      .subscribe(() => {
        this.isJoined = false;
        this.router.navigateByUrl('/game/' + this.game.id);
      });
  }

  handleDelete() {
    this.gameService
      .deleteGame(this.game.id)
      .pipe(
        switchMap(() => this.gameService.getAllGames()),
        tap((games) => {
          this.gameService.games$.next(games);
        })
      )
      .subscribe(() => {
        this.router.navigateByUrl('game');
      });
  }
}
