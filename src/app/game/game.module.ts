import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameListComponent } from './game.list/game.list.component';
import { RouterModule } from '@angular/router';
import { GameCardComponent } from './game.card/game.card.component';

@NgModule({
  declarations: [GameListComponent, GameCardComponent],
  imports: [CommonModule, RouterModule],
})
export class GameModule {}
