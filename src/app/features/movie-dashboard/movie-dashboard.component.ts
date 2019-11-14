import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieSearchService } from '../../services/movie-search.service';
import { Observable, Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, exhaustMap, filter, map, switchMap, takeWhile, tap } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { OmdbiListItemModel } from '../../model/omdbi-list-item.model';
import { OmdbiListResponseModel } from '../../model/omdbi-list-response.model';
import { BOOLEAN_STRING_FALSE, DEFAULT_COUNT_PER_PAGE, LOGO } from 'src/app/util/const/app.const';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationSettingService } from 'src/app/core/application-setting/application-setting.service';
import { NotificationService } from 'src/app/core/notifications/notification.service';


@Component({
  selector: 'app-movie-dashboard',
  templateUrl: './movie-dashboard.component.html',
  styleUrls: ['./movie-dashboard.component.scss']
})
export class MovieDashboardComponent implements OnInit, OnDestroy {
  title: string;
  isLoading = false;
  logo = LOGO;
  resultList: Array<OmdbiListItemModel>;
  findForm: FormGroup;
  searchResultMessage: string;
  currentPage: number;
  countPerPage: number = DEFAULT_COUNT_PER_PAGE;
  totalCountPage = 0;
  currentSearchLine: string;
  private nextPage$ = new Subject();

  constructor(
    private notifyService: NotificationService,
    private service: MovieSearchService,
    private appService: ApplicationSettingService,
    private fb: FormBuilder,
    private translateService: TranslateService
  ) {

    this.findForm = this.fb.group({
      'title': ['']
    });

    this.findForm.get('title').valueChanges.pipe(
      untilDestroyed(this),
      debounceTime(500),
      tap((data: string | OmdbiListItemModel | any) => {
        // this.isLoading = true;
        this.currentSearchLine = this.getDataTitle(data);
      }),
      map((data: string | OmdbiListItemModel | any) => {
        return this.getDataTitle(data);
      }),
      switchMap((srcValue: string): Observable<OmdbiListResponseModel> => {
        return this.service.findMovieByName({s: srcValue});
      }),
      tap((data) => {
        // this.isLoading = false;
        if (data && data.Response === BOOLEAN_STRING_FALSE) {
          this.searchResultMessage = data.Error;
          this.currentPage = 0;
          this.totalCountPage = 0;
        } else {
          this.searchResultMessage = this.translateService.instant('ams.dashboard.find-result', {data: data.totalResults});
          this.currentPage = 1;
          this.totalCountPage = +(data.totalResults / this.countPerPage);
        }
      }),
      map((data) => {
        return data.Search;
      })
    ).subscribe((item) => {
      this.resultList = item;
    });

    this.nextPage$.pipe(
      untilDestroyed(this),
      filter((data) => this.currentPage >= 1),
      tap(data => {
        this.currentPage++;
      }),
      exhaustMap(_ => this.service.findMovieByName({s: this.currentSearchLine, p: this.currentPage})),
      takeWhile(p => (!!p.Search || p.Search.length > 0))
    ).subscribe((data) => {
      this.resultList.push(...data.Search);
    });

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  nextResultPage() {
    this.currentPage++;
    this.service.findMovieByName({s: this.currentSearchLine, p: this.currentPage})
      .subscribe((data) => {
        this.resultList.push(...data.Search);
      });
  }

  addToBasket(item: OmdbiListItemModel) {
    this.appService.addToBasketData(item);
  }

  displayFn(user: OmdbiListItemModel) {
    if (user) { return user.Title; }
  }

  optionalScrollAction($event: any) {
    this.nextPage$.next();
  }

  private getDataTitle(data: any) {
    return (data && data.Title) ? data.Title : data;
  }
}
