import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/models/user';

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
    console.log(files);
    if (files) {
      const avatarFormControl = this.signup.get('avatar') as FormControl;
      console.log(avatarFormControl);
      avatarFormControl.setValue(files.item);
      console.log(avatarFormControl);
    }
  }

  handleSignup() {
    const newUser: Partial<User> = {
      userName: this.signup.value.userName,
      email: this.signup.value.email,
      level: this.signup.value.level,
      gender: this.signup.value.gender,
      avatar: this.signup.value.avatar,
      password: this.signup.value.password,
    };

    console.log(newUser);

    this.userService.userRegister(newUser).subscribe();
  }
}
