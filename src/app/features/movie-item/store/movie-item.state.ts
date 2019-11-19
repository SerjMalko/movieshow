import { Action, Selector, State, StateContext } from '@ngxs/store';
import { BOOLEAN_STRING_FALSE } from 'src/app/util/const/app.const';
import { TranslateService } from '@ngx-translate/core';
import { MovieSearchService } from 'src/app/services/movie-search.service';
import { tap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { OmdbiItemModel } from 'src/app/model/omdbi-item.model';
import { OpenMovieAction } from 'src/app/features/movie-item/store/movie-item.action';

export interface MovieItemStateModel {
  item?: OmdbiItemModel;
}

@State<MovieItemStateModel>({
  name: 'movieItem',
  defaults: {}
})
export class MovieItemState {

  @Selector()
  static movieItem(state: MovieItemStateModel): OmdbiItemModel {
    return state.item;
  }

  constructor(
    private translateService: TranslateService,
    private movieService: MovieSearchService,
    private _location: Location
  ) {

  }

  @Action(OpenMovieAction)
  openMovie(ctx: StateContext<MovieItemStateModel>, {payload}: { payload: { movieId: string } }) {
    console.log('movieId ->', payload, payload.movieId);
    return this.movieService
      .getMovieById(payload.movieId)
      .pipe(
        tap((data) => {
          if (data.Response === BOOLEAN_STRING_FALSE) {
            // TODO Add message about invalid Id
            this._location.back();
          } else {
            ctx.patchState({
              item: data
            });
          }
        })
      );
  }

}
