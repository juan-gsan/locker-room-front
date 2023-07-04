import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { first, map, switchMap, tap } from 'rxjs';
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
  constructor(
    private gameService: GameService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.route);
    this.route.params.subscribe((params) => (this.params = params));
    this.loadGameCard(this.params['id']);
  }

  loadGameCard(id: string) {
    this.gameService.getGame(id).subscribe((game) => {
      this.game = game;
      console.log(game);
      this.gameService.game$.next(game);
      this.checkToken();
      this.checkOwner();
    });
  }

  checkToken() {
    console.log(this.isLogged);
    this.userService.token$.subscribe((token) => {
      if (token.token) {
        this.isLogged = true;
        console.log(this.isLogged);
      }
    });
  }

  checkOwner() {
    console.log(this.isOwner);
    this.userService.token$.subscribe((token) => {
      this.gameService.game$.subscribe((game) => {
        if (token.user.id === game.owner.id) {
          this.isOwner = true;
          console.log(this.isOwner);
        }
      });
    });
  }

  handleJoin() {
    this.gameService.game$
      .pipe(
        map((game) => {
          console.log(this.userService.token$.value.user);
          game.players.push(this.userService.token$.value.user);
          game.spotsLeft -= 1;
          return game;
        }),
        first()
      )
      .subscribe((game) => {
        this.gameService.joinGame(game.id, game).subscribe();
        console.log(game);
      });
  }

  handleEdit() {
    this.router.navigateByUrl('/game/edit/' + this.game.id);
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
