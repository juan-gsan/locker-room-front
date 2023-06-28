/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {
  @Input() errorMessage = '';

  constructor() {}

  ngOnInit(): void {
    this.timeError();
  }

  ngOnDestroy(): void {
    this.errorMessage = '';
  }

  timeError() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 2500);
  }
}
