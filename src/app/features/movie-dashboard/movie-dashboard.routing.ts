import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDashboardComponent } from 'src/app/features/movie-dashboard/movie-dashboard.component';
import { BasketClientComponent } from 'src/app/features/basket-client/basket-client.component';

const routes: Routes = [
  {
    path: '',
    component: MovieDashboardComponent,
    data: { title: 'ams.menu.dashboard'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: []
})
export class MovieDashboardRouting {}
