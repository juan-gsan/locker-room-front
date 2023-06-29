import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game.list',
  templateUrl: './game.list.component.html',
  styleUrls: ['./game.list.component.scss'],
})
export class GameListComponent implements OnInit {
  games: Game[] = [];
  constructor(public gameService: GameService) {}

  ngOnInit(): void {
    this.loadAllGames();
  }

  loadAllGames(): void {
    this.gameService.getAllGames().subscribe((games) => {
      this.games = games;
      console.log(games);
      this.gameService.games$.next(games);
    });
  }
}
