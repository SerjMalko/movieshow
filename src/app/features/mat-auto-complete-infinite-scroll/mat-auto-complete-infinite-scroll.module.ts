import { NgModule } from '@angular/core';
import { MatAutoCompleteInfiniteScrollDirective } from 'src/app/features/mat-auto-complete-infinite-scroll/mat-auto-complete-infinite-scroll.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  exports: [MatAutoCompleteInfiniteScrollDirective],
  declarations: [MatAutoCompleteInfiniteScrollDirective],
  providers: []
})
export class MatAutoCompleteInfiniteScrollModule {}

