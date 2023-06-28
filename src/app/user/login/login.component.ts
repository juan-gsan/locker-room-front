import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  login: FormGroup;
  constructor(public formBuilder: FormBuilder) {
    this.login = formBuilder.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  handleLogin() {
    const loggedUser = {
      user: this.login.value.user as string,
      password: this.login.value.password as string,
    };

    console.log(loggedUser);
  }
}
