import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDashboardComponent } from './movie-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovieDashboardRouting } from 'src/app/features/movie-dashboard/movie-dashboard.routing';

@NgModule({
  declarations: [MovieDashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    MovieDashboardRouting
  ]
})
export class MovieDashboardModule {}
