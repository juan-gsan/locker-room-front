import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-game.form',
  templateUrl: './game.form.component.html',
  styleUrls: ['./game.form.component.scss'],
})
export class GameFormComponent implements OnInit {
  game: FormGroup;
  isNew = false;
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
  }

  checkNew() {
    console.log(this.isNew);
    const containsSegment = this.route.snapshot.url.some(
      (segment) => segment.path === 'create'
    );
    if (containsSegment === true) this.isNew = true;
    console.log(this.isNew);
  }

  handleFileInput(event: Event) {
    const fileInput: HTMLInputElement = event.target as HTMLInputElement;
    const files: FileList | null = fileInput.files;
    if (files) {
      console.log(files[0]);
      const avatarFormControl = this.game.get('avatar') as FormControl;
      avatarFormControl.setValue(files[0]);
      console.log(avatarFormControl);
    }
  }

  handleGame() {
    const data = new FormData();
    data.append('avatar', this.game.value.avatar);
    data.append('location', this.game.get('location')?.value);
    data.append('date', this.game.get('date')?.value);
    data.append('level', this.game.get('level')?.value);
    data.append('gender', this.game.get('gender')?.value);
    data.append('type', this.game.get('type')?.value);
    console.log(data);

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
