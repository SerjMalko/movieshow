import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '', redirectTo: 'movie-dashboard', pathMatch: 'full'
  },
  {
    path: 'movie-dashboard',
    loadChildren: () => import('./features/movie-dashboard/movie-dashboard.module').then(m => m.MovieDashboardModule)
  },
  {
    path: 'movie-dashboard/:id',
    loadChildren: () => import('./features/movie-item/movie-item.module').then(m => m.MovieItemModule)
  },
  {
    path: 'basket-client',
    loadChildren: () => import('./features/basket-client/basket-client.module').then(m => m.BasketClientModule)
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
