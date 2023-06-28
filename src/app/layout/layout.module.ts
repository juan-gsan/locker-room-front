import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, LayoutComponent],
  imports: [CommonModule, RouterModule],
  exports: [LayoutComponent],
})
export class LayoutModule {}
