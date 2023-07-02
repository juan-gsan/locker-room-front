import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { FeedbackComponent } from './feedback/feedback.component';

@NgModule({
  declarations: [ErrorComponent, FeedbackComponent],
  imports: [CommonModule],
  exports: [ErrorComponent, FeedbackComponent],
})
export class CommonsModule {}
