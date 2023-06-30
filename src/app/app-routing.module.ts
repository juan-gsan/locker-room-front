import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { GameListComponent } from './game/game.list/game.list.component';
import { GameCardComponent } from './game/game.card/game.card.component';
import { GameFormComponent } from './game/game.form/game.form.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'game', component: GameListComponent },
  { path: 'game/:id', component: GameCardComponent },
  { path: 'game/create', component: GameFormComponent },
  { path: 'game/edit', component: GameFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
