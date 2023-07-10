/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {
  constructor(public location: Location) {}

  navigateBack() {
    this.location.back();
  }
}
