import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signup: FormGroup;
  constructor(public formBuilder: FormBuilder, private router: Router) {
    this.signup = formBuilder.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      level: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      avatar: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  handleSubmit() {
    const newUser: Partial<User> = {
      userName: this.signup.value.userName,
      email: this.signup.value.email,
      level: this.signup.value.level,
      gender: this.signup.value.gender,
      avatar: this.signup.value.avatar,
      password: this.signup.value.password,
    };

    console.log(newUser);
  }
}
