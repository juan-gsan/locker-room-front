import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs';
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
    private route: ActivatedRoute
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
    const gameSubscription = this.gameService.game$.subscribe((game) => {
      console.log(this.userService.token$.value.user);
      game.players.push(this.userService.token$.value.user);

      this.gameService.joinGame(game.id, game).pipe(first()).subscribe();
    });

    gameSubscription.unsubscribe();
  }

  handleDelete() {
    this.gameService.game$.subscribe((game) => {
      console.log(game);
      this.gameService.deleteGame(game.id).pipe(first()).subscribe();
    });
  }
}
