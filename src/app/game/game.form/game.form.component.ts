import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { Game } from 'src/models/game';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-game.form',
  templateUrl: './game.form.component.html',
  styleUrls: ['./game.form.component.scss'],
})
export class GameFormComponent implements OnInit {
  game: FormGroup;
  isNew = false;
  currentGameData = {} as Game;
  constructor(
    public formBuilder: FormBuilder,
    private gameService: GameService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.game = formBuilder.group({
      location: ['', [Validators.required]],
      schedule: ['', [Validators.required]],
      gameType: ['', [Validators.required]],
      level: [null, [Validators.required]],
      gender: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.checkNew();
    if (!this.isNew) this.getCurrentGameData();
  }
  checkNew() {
    console.log(this.isNew);
    const containsSegment = this.route.snapshot.url.some(
      (segment) => segment.path === 'create'
    );
    if (containsSegment === true) this.isNew = true;
    console.log(this.isNew);
  }

  getCurrentGameData() {
    if (!this.isNew) {
      const gameId = this.route.snapshot.params['id'];
      this.gameService.getGame(gameId).subscribe((data) => {
        this.currentGameData = data;
        this.getFormInitialValues();
      });
    }
  }

  getFormInitialValues() {
    this.game.patchValue({
      location: this.currentGameData?.location || '',
      schedule: this.currentGameData?.schedule || '',
      gameType: this.currentGameData?.gameType || '',
      level: this.currentGameData?.level || null,
      gender: this.currentGameData?.gender || '',
    });
  }

  handleGame() {
    const newGame = {
      location: this.game.value.location,
      schedule: this.game.value.schedule,
      gameType: this.game.value.gameType,
      level: this.game.value.level,
      gender: this.game.value.gender,
    };

    this.gameService.createGame(newGame).subscribe();

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: 'Done!',
    });

    this.router.navigateByUrl('game');
  }
}
