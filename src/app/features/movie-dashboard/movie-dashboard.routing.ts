import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDashboardComponent } from 'src/app/features/movie-dashboard/movie-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: MovieDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: []
})
export class MovieDashboardRouting {}
