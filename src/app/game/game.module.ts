import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameListComponent } from './game.list/game.list.component';
import { RouterModule } from '@angular/router';
import { GameCardComponent } from './game.card/game.card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GameFormComponent } from './game.form/game.form.component';
import { MenuComponent } from '../menu/menu.component';

@NgModule({
  declarations: [
    MenuComponent,
    GameListComponent,
    GameCardComponent,
    GameFormComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class GameModule {}
