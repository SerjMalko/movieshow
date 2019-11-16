import { Action, Selector, State, StateContext } from '@ngxs/store';
import { OmdbiListResponseModel } from 'src/app/model/omdbi-list-response.model';
import { FindMovieListAction, FindMovieListSuccessAction } from 'src/app/features/movie-dashboard/store/movie-dashboard.action';
import { BOOLEAN_STRING_FALSE, DEFAULT_COUNT_PER_PAGE } from 'src/app/util/const/app.const';
import { OmdbiListItemModel } from 'src/app/model/omdbi-list-item.model';
import { TranslateService } from '@ngx-translate/core';
import { MovieSearchService } from 'src/app/services/movie-search.service';
import { tap } from 'rxjs/operators';

export interface MovieDashboardStateModel {
  currentSearchData?: string;
  currentPage: number;
  searchResultMessage: string;
  countPerPage: number;
  totalCountPage: number;
  moviesList?: Array<OmdbiListItemModel>;
}

@State<MovieDashboardStateModel>({
  name: 'movieDashboard',
  defaults: {
    currentPage: 0,
    totalCountPage: 0,
    searchResultMessage: '',
    moviesList: [],
    countPerPage: DEFAULT_COUNT_PER_PAGE
  }
})
export class MovieDashboardState {

  @Selector()
  public static getState(state: MovieDashboardStateModel) {
    return state;
  }

  @Selector()
  static searchResultMessage(state: MovieDashboardStateModel) {
    return state.searchResultMessage;
  }

  @Selector()
  static haveMoreItems(state: MovieDashboardStateModel) {
    return state.currentPage < state.totalCountPage;
  }


  @Selector()
  static movieList(state: MovieDashboardStateModel): Array<OmdbiListItemModel> {
    return state.moviesList;
  }

  constructor(
    private translateService: TranslateService,
    private movieService: MovieSearchService
  ) {

  }

  @Action(FindMovieListAction)
  finMovieList(ctx: StateContext<MovieDashboardStateModel>, {payload}: { payload: { keyWords?: any, page?: number, nextPage?: boolean } }) {
    // If keyWords don't exist, we push more button with previous keywords value
    if (payload.keyWords) {
      ctx.patchState({
        currentSearchData: this.getDataTitle(payload.keyWords)
      });
    }

    let reqPage = 0;
    if (payload.nextPage) {
      reqPage = ctx.getState().currentPage + 1;
    } else {
      reqPage = (!payload.page) ? 1 : (payload.page + 1);
    }

    // Check end of array (only when more button or scroll exist value)
    if (!payload.keyWords && ctx.getState().totalCountPage !== 0 && reqPage >= ctx.getState().totalCountPage) {
      return ctx;
    }

    return this.movieService.findMovieByName({s: ctx.getState().currentSearchData, p: reqPage}).pipe(
      tap((result) => {
        ctx.dispatch(new FindMovieListSuccessAction(
          {
            result: result, currentPage: reqPage
          }));
      })
    );
  }

  @Action(FindMovieListSuccessAction)
  findMovieListSuccess(ctx: StateContext<MovieDashboardStateModel>, {payload}: {
    payload: { result: OmdbiListResponseModel, currentPage?: number }
  }) {
    const state = ctx.getState();
    const resultData = payload.result;

    let searchResultMessage;
    let currentPage;
    let totalCountPage;
    let moviesList;
    if (payload.currentPage === 1) {
      if (resultData && resultData.Response === BOOLEAN_STRING_FALSE) {
        searchResultMessage = resultData.Error;
        currentPage = 0;
        totalCountPage = 0;
      } else {
        searchResultMessage = this.translateService.instant('ams.dashboard.find-result', {data: resultData.totalResults});
        currentPage = 1;
        totalCountPage = +(resultData.totalResults / state.countPerPage);
      }
      moviesList = resultData.Search;
      ctx.patchState({
        searchResultMessage: searchResultMessage,
        totalCountPage: totalCountPage
      });
    } else {
      currentPage = payload.currentPage;
      moviesList = [...state.moviesList, ...resultData.Search];
    }

    ctx.patchState({
      currentPage: currentPage,
      moviesList: moviesList
    });
  }

  private getDataTitle(data: any) {
    return (data && data.Title) ? data.Title : data;
  }

}
