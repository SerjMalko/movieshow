import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngxs/store';
import { OpenMovieAction } from 'src/app/features/movie-item/store/movie-item.action';

@Injectable({providedIn: 'root'})
export class ContactResolve implements Resolve<any> {

  constructor(private store: Store) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    console.log('route.paramMap.get(\'id\') ->', route.paramMap.get('id'));
    return this.store.dispatch(
      new OpenMovieAction({movieId: route.paramMap.get('id')})
    );
  }
}
