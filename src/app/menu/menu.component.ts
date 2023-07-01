import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

type MenuOptions = {
  path: string;
  image: string;
  label: string;
};

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  menuOptions: MenuOptions[];
  constructor(private userService: UserService) {
    this.menuOptions = [
      { path: '/', label: 'Log Out', image: 'log.out' },
      { path: this.getNewGamePath(), label: 'New Game', image: 'new.game' },
      { path: '/game', label: 'Explore', image: 'explore' },
    ];
  }

  getNewGamePath(): string {
    return '/game/create/' + this.userService.token$.value.user.id;
  }

  handleLogout() {
    this.userService.userLogout();
  }
}
