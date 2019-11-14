import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieItemComponent } from 'src/app/features/movie-item/movie-item.component';
import { ContactResolve } from 'src/app/features/movie-item/movie-item.resolve';

const routes: Routes = [
  {
    path: '',
    component: MovieItemComponent,
    resolve: {
      item: ContactResolve
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [],
  providers: [ContactResolve]
})
export class MovieItemRouting {}
