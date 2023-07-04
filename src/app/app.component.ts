import { Component, OnInit } from '@angular/core';
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
    this.getInitialToken();
  }

  getInitialToken() {
    const localStorageString = localStorage.getItem('userToken');

    if (!localStorageString) return;
    const userInfo = JSON.parse(localStorageString);
    console.log(userInfo);
    this.userService.token$.next(userInfo);
  }
}
