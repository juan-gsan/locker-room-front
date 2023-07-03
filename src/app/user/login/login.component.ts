// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserLogged } from 'src/types/user.logged';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  userLogged: UserLogged = {
    id: '',
    email: '',
    userName: '',
  };

  constructor(
    public formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.login = formBuilder.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.userService.token$.subscribe((token) => console.log(token));
  }

  handleLogin() {
    const loggedUser = {
      user: this.login.value.user,
      password: this.login.value.password,
    };

    this.userService.userLogin(loggedUser).subscribe((token) => {
      this.userService.token$.next(token);

      localStorage.setItem('userToken', JSON.stringify(token));

      this.router.navigateByUrl('game');
    });
  }
}
