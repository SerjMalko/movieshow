import {RouterModule, Routes} from '@angular/router';
import {MovieDashboardComponent} from './features/movie-dashboard/movie-dashboard.component';
import {NgModule} from '@angular/core';


const routes: Routes = [
    {
      path: '', redirectTo: 'movie-dashboard', pathMatch: 'full'
    },
    {
      path: 'movie-dashboard', component: MovieDashboardComponent
    },
    {
      path: '**', redirectTo: 'movie-dashboard', pathMatch: 'full'
    }
  ];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [],
  declarations: [],
})
export class AppRoutingModule {
}
