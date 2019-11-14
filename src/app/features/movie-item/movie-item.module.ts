import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieItemComponent } from './movie-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovieItemRouting } from 'src/app/features/movie-item/movie-item.routing';

@NgModule({
  declarations: [MovieItemComponent],
  imports: [
    CommonModule,
    SharedModule,
    MovieItemRouting
  ]
})
export class MovieItemModule {}
