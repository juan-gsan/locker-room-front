// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { UserLogged } from 'src/types/user.logged';
import Swal from 'sweetalert2';

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
    public router: Router
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

    this.userService
      .userLogin(loggedUser)
      .pipe(
        catchError(() => {
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
            icon: 'error',
            title: 'Invalid credentials',
          });

          throw new Error('Invalid credentials');
        })
      )
      .subscribe((token) => {
        this.userService.token$.next(token);

        if (token) {
          localStorage.setItem('userToken', JSON.stringify(token));
          this.router.navigateByUrl('game');
        }
      });
  }
}
