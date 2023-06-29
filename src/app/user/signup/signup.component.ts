import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signup: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.signup = formBuilder.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      level: [null, [Validators.required]],
      gender: ['', [Validators.required]],
      avatar: new FormControl(null),
      password: ['', [Validators.required]],
    });
  }

  handleFileInput(event: Event) {
    const fileInput: HTMLInputElement = event.target as HTMLInputElement;
    const files: FileList | null = fileInput.files;
    if (files) {
      console.log(files[0]);
      const avatarFormControl = this.signup.get('avatar') as FormControl;
      avatarFormControl.setValue(files[0]);
      console.log(avatarFormControl);
    }
  }

  handleSignup() {
    const data = new FormData();
    data.append('avatar', this.signup.value.avatar);
    data.append('userName', this.signup.get('userName')?.value);
    data.append('email', this.signup.get('email')?.value);
    data.append('level', this.signup.get('level')?.value);
    data.append('gender', this.signup.get('gender')?.value);
    data.append('password', this.signup.get('password')?.value);
    console.log(data);

    this.userService.userRegister(data).subscribe();
  }
}
