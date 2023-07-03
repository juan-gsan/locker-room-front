import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
      date: ['', [Validators.required]],
      type: ['', [Validators.required]],
      level: [null, [Validators.required]],
      gender: ['', [Validators.required]],
      avatar: new FormControl(null),
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
      date: this.currentGameData?.schedule || '',
      type: this.currentGameData?.gameType || '',
      level: this.currentGameData?.level || null,
      gender: this.currentGameData?.gender || '',
      avatar: this.currentGameData?.avatar || '',
    });
  }

  handleImageInput(event: Event) {
    const fileInput: HTMLInputElement = event.target as HTMLInputElement;
    const files: FileList | null = fileInput.files;

    if (files) {
      const imageFormControl = this.game.get('avatar') as FormControl;
      console.log(files[0]);
      imageFormControl.setValue(files[0]);
      console.log(files[0]);
      console.log('avatar', imageFormControl);
    }
  }

  handleGame() {
    const data = new FormData();
    data.append('location', this.game.get('location')?.value);
    data.append('date', this.game.get('date')?.value);
    data.append('type', this.game.get('type')?.value);
    data.append('level', this.game.get('level')?.value);
    data.append('gender', this.game.get('gender')?.value);
    data.append('avatar', this.game.value.avatar);

    console.log(data.get('avatar'));

    this.gameService.createGame(data).subscribe();

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
