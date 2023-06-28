import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { UserLogged } from 'src/types/user.logged';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = '202304-FinalProjectFront-Juan-Garcia';
  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('OnInit executed');
    const localStorageString = localStorage.getItem('userToken');
    if (!localStorageString) return console.log('No token');
    const { token } = JSON.parse(localStorageString);
    const userLoggedData: UserLogged = jwtDecode(token);
    console.log(userLoggedData);
    console.log(token);
    this.router.navigateByUrl('');
  }
}
