import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserLogged } from 'src/types/user.logged';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  login: FormGroup;
  userLogged: UserLogged = { id: '', email: '', userName: '' };
  constructor(
    public formBuilder: FormBuilder,
    private userService: UserService,
    private zone: NgZone,
    private router: Router
  ) {
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

    this.userService.userLogin(loggedUser).subscribe((token) => {
      this.zone.run(() => {
        this.router.navigateByUrl('');
      });

      localStorage.setItem('userToken', JSON.stringify(token));
      console.log(token);
      this.userLogged.id = token.user.id as string;
      this.userLogged.email = token.user.email as string;
      this.userLogged.userName = token.user.userName as string;
    });
    console.log(loggedUser);
    console.log(this.userLogged);
  }
}
