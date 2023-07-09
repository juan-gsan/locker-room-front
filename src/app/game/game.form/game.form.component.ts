import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { Game } from 'src/models/game';
import { SportsField } from 'src/types/sports.field';
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
  sportsFields: SportsField[] = [
    {
      id: '1',
      name: 'CD Municipal Pradillo',
      location: 'C. de Pradillo 33, 28002 Madrid',
      avatar: 'assets/field01.jpg',
    },
    {
      id: '2',
      name: 'CD Municipal La Elipa',
      location: 'C. del Alcalde Garrido Juaristi 17, 28030 Madrid',
      avatar: 'assets/field02.jpg',
    },
    {
      id: '3',
      name: 'CD Municipal Luis Aragonés',
      location: 'C. El Provencio 20, 28043 Madrid',
      avatar: 'assets/field03.jpg',
    },
    {
      id: '4',
      name: 'CD Municipal La Chopera',
      location: 'Paseo de Fernán Núñez 3, 28009 Madrid',
      avatar: 'assets/field04.jpg',
    },
    {
      id: '5',
      name: 'Club Deportivo Goya',
      location: 'Av. de los Caprichos 16, 28011 Madrid',
      avatar: 'assets/field05.jpg',
    },
    {
      id: '6',
      name: 'CD Municipal Moratalaz',
      location: 'C. de Valdebernardo 2, 28030 Madrid',
      avatar: 'assets/field06.jpg',
    },
  ];
  constructor(
    public formBuilder: FormBuilder,
    public gameService: GameService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    this.game = formBuilder.group({
      location: [{}, [Validators.required]],
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
    const containsSegment = this.route.snapshot.url.some(
      (segment) => segment.path === 'create'
    );
    if (containsSegment === true) this.isNew = true;
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
      location: this.currentGameData?.location.name || '',
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

    if (this.isNew) {
      this.gameService.createGame(newGame).subscribe(() => {
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
      });
    }

    if (!this.isNew) {
      this.gameService
        .editGame(this.route.snapshot.params['id'], newGame)
        .subscribe(() => {
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
        });
    }
  }
}
