import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { UserService } from 'src/app/services/user.service';
import { Game } from 'src/models/game';
import { User } from 'src/models/user';

@Component({
  selector: 'app-game.list',
  templateUrl: './game.list.component.html',
  styleUrls: ['./game.list.component.scss'],
})
export class GameListComponent implements OnInit {
  items: Game[] = [];
  next: string | null = null;
  prev: string | null = null;
  currentUser: Partial<User> = {};
  constructor(
    public gameService: GameService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadAllGames();
    this.userService.token$.subscribe(
      (token) => (this.currentUser = token.user)
    );
  }

  loadAllGames(): void {
    this.gameService.getAllGames().subscribe((games) => {
      this.items = games;
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

  handleFilter(filter: string) {
    this.gameService
      .getAllGames(this.gameService.url, filter)
      .subscribe((games) => {
        this.items = games;
        this.gameService.games$.next(games);
        this.next = this.gameService.next$.value;
        this.prev = this.gameService.prev$.value;
      });
  }
}
