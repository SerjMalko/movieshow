import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export function loadMovieDashboard() {
  return  () => import(`./features/movie-dashboard/movie-dashboard.module`).then(m => m.MovieDashboardModule);
}

export function loadMovieItem() {
  return () => import(`./features/movie-item/movie-item.module`).then(m => m.MovieItemModule);
}

export function loadBasket() {
  return () => import(`./features/basket-client/basket-client.module`).then(m => m.BasketClientModule);
}

const routes: Routes = [
  {
    path: '', redirectTo: 'movie-dashboard', pathMatch: 'full'
  },
  {
    path: 'movie-dashboard',
    loadChildren: loadMovieDashboard()
  },
  {
    path: 'movie-dashboard/:id',
    loadChildren: loadMovieItem()
  },
  {
    path: 'basket-client',
    loadChildren: loadBasket()
  },
  {
    path: '**', redirectTo: 'movie-dashboard', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [],
  declarations: []
})
export class AppRoutingModule {
}
