import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game.list',
  templateUrl: './game.list.component.html',
  styleUrls: ['./game.list.component.scss'],
})
export class GameListComponent implements OnInit {
  items: Game[] = [];
  next: string | null = null;
  prev: string | null = null;
  selectedFilter = '';
  constructor(public gameService: GameService) {}

  ngOnInit(): void {
    this.loadAllGames();
  }

  loadAllGames(): void {
    this.gameService.getAllGames().subscribe((games) => {
      this.items = games;
      console.log(games);
      this.gameService.games$.next(games);
      this.next = this.gameService.next$.value;
      this.prev = this.gameService.prev$.value;
    });
  }

  handleNext() {
    if (!this.next) return;
    this.gameService.getAllGames(this.next).subscribe((games) => {
      this.items = games;
      this.gameService.games$.next(games);
      this.next = this.gameService.next$.value;
      this.prev = this.gameService.prev$.value;
    });
  }

  handlePrevious() {
    if (!this.prev) return;
    this.gameService.getAllGames(this.prev).subscribe((games) => {
      this.items = games;
      this.gameService.games$.next(games);
      this.next = this.gameService.next$.value;
      this.prev = this.gameService.prev$.value;
    });
  }

  handleFilter(event: Event) {
    const element = event.target as HTMLButtonElement;
    this.selectedFilter = element.dataset['id'] || '';
    this.loadAllGames();
  }
}
