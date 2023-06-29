import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game.card',
  templateUrl: './game.card.component.html',
  styleUrls: ['./game.card.component.scss'],
})
export class GameCardComponent implements OnInit {
  game: Game = {} as Game;
  params: Params = { id: '' };

  constructor(
    private gameService: GameService,
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
    });
  }
}
