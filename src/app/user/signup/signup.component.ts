import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signup: FormGroup;
  avatar: File | null = null;
  constructor(
    public formBuilder: FormBuilder,
    private userService: UserService,
    public router: Router
  ) {
    this.signup = formBuilder.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      level: [null, [Validators.required]],
      gender: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  handleFileInput(event: Event) {
    // const fileInput: HTMLInputElement = event.target as HTMLInputElement;
    // const files: FileList | null = fileInput.files;
    // if (files) {
    //   const avatarFormControl = this.signup.get('avatar') as FormControl;
    //   avatarFormControl.setValue(files[0]);
    // }
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.avatar = files.item(0);
  }

  handleSignup() {
    const data = new FormData();

    data.append('userName', this.signup.get('userName')?.value);
    data.append('email', this.signup.get('email')?.value);
    data.append('level', this.signup.get('level')?.value);
    data.append('gender', this.signup.get('gender')?.value);
    data.append('password', this.signup.get('password')?.value);
    if (this.avatar) {
      data.append('avatar', this.avatar, this.avatar.name);
    }

    this.userService.userRegister(data).subscribe();

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
      title: 'Signed in',
    });

    this.router.navigateByUrl('login');
  }
}
