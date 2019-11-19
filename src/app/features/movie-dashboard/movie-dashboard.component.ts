import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, exhaustMap, filter, switchMap } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { OmdbiListItemModel } from '../../model/omdbi-list-item.model';
import { OmdbiListResponseModel } from '../../model/omdbi-list-response.model';
import { LOGO } from 'src/app/util/const/app.const';
import { Select, Store } from '@ngxs/store';
import { FindMovieListAction } from 'src/app/features/movie-dashboard/store/movie-dashboard.action';
import { MovieDashboardState } from 'src/app/features/movie-dashboard/store/movie-dashboard.state';
import { AddMovieToBasketAction } from 'src/app/features/basket-client/store/basket-client.action';

@Component({
  selector: 'app-movie-dashboard',
  templateUrl: './movie-dashboard.component.html',
  styleUrls: ['./movie-dashboard.component.scss']
})
export class MovieDashboardComponent implements OnInit, OnDestroy {

  isLoading = false;
  logo = LOGO;
  findForm: FormGroup;
  private nextPage$ = new Subject();

  @Select(MovieDashboardState.movieList)
  movieList: Observable<Array<OmdbiListItemModel>>;

  @Select(MovieDashboardState.searchResultMessage)
  searchResultMsg: Observable<string>;

  @Select(MovieDashboardState.haveMoreItems)
  haveMoreItems: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {

    this.findForm = this.fb.group({
      'title': ['']
    });

    this.listenFinderLineAction();
    this.listenAutoCompleteAction();

  }

  private listenAutoCompleteAction() {
    this.nextPage$.pipe(
      untilDestroyed(this),
      filter((data) => {
        return this.store.selectSnapshot(MovieDashboardState.haveMoreItems);
      }),
      exhaustMap(_ =>
        this.store.dispatch(new FindMovieListAction({nextPage: true}))
      )
    ).subscribe((data) => {
    });
  }

  private listenFinderLineAction() {
    this.findForm.get('title').valueChanges.pipe(
      untilDestroyed(this),
      debounceTime(500),
      switchMap((srcValue: string): Observable<OmdbiListResponseModel> => {
        return this.store.dispatch(new FindMovieListAction({keyWords: srcValue}));
      })
    ).subscribe((item) => {
      console.log('item ->', item);
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  nextResultPage() {
    this.store.dispatch(new FindMovieListAction({nextPage: true}));
  }

  addToBasket(item: OmdbiListItemModel) {
    this.store.dispatch(new AddMovieToBasketAction({item: item}));
  }

  displayFn(user: OmdbiListItemModel) {
    if (user) { return user.Title; }
  }

  optionalScrollAction($event: any) {
    this.nextPage$.next();
  }
}
