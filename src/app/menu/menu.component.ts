import { Component } from '@angular/core';

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

  constructor() {
    this.menuOptions = [
      { path: '/', label: 'Log Out', image: 'log.out' },
      { path: '/game/:id', label: 'New Game', image: 'new.game' },
      { path: '/game', label: 'Explore', image: 'explore' },
    ];
  }
}
