import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { HomeModule } from './home/home.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserModule } from './user/user.module';
import { CommonsModule } from './commons/commons.module';
import { HttpClientModule } from '@angular/common/http';
import { GameModule } from './game/game.module';
import { UserService } from './services/user.service';
import { GameService } from './services/game.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    HomeModule,
    UserModule,
    GameModule,
    CommonsModule,
    ReactiveFormsModule,
  ],
  providers: [UserService, GameService],
  bootstrap: [AppComponent],
})
export class AppModule {}
