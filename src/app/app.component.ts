import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { UserLogged } from 'src/types/user.logged';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = '202304-FinalProjectFront-Juan-Garcia';
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    console.log('OnInit executed');
    this.getInitialToken();
  }

  getInitialToken() {
    const localStorageString = localStorage.getItem('userToken');

    if (!localStorageString) return console.log('No token');
    const userInfo = JSON.parse(localStorageString);
    const userLoggedData: UserLogged = jwtDecode(userInfo.token);
    console.log(userLoggedData);
    this.userService.token$.next(userInfo);
    console.log(this.userService.token$);
  }
}
