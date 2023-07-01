import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game.form',
  templateUrl: './game.form.component.html',
  styleUrls: ['./game.form.component.scss'],
})
export class GameFormComponent {
  game: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private gameService: GameService,
    private router: Router
  ) {
    this.game = formBuilder.group({
      location: ['', [Validators.required]],
      date: ['', [Validators.required]],
      type: ['', [Validators.required]],
      level: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });
  }

  handleGame() {
    const newGame = {
      location: this.game.value.location,
      date: this.game.value.date,
      type: this.game.value.type,
      level: this.game.value.level,
      gender: this.game.value.gender,
    };
    console.log(newGame);
    this.gameService.createGame(newGame).subscribe();
  }
}
