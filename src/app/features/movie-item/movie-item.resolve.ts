import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { MovieSearchService } from 'src/app/services/movie-search.service';
import { tap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { BOOLEAN_STRING_FALSE } from 'src/app/util/const/app.const';

@Injectable({providedIn: 'root'})
export class ContactResolve implements Resolve<any> {

  constructor(private service: MovieSearchService, private _location: Location) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.service
      .getMovieById(route.paramMap.get('id'))
      .pipe(
        tap((data) => {
          if (data.Response === BOOLEAN_STRING_FALSE) {
            // TODO Add message about invalid Id
            this._location.back();
          }
        })
      );
  }
}
