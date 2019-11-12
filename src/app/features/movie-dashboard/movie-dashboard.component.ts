import {Component, OnDestroy, OnInit} from '@angular/core';
import {MovieSearchService} from '../../services/movie-search.service';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime, map, switchMap, tap} from 'rxjs/operators';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {OmdbiListItemModel} from '../../model/omdbi-list-item.model';
import {OmdbiListResponseModel} from '../../model/omdbi-list-response.model';

export interface MovieItem {
  Title: string;
  Year: string;
  Released: string;
}


@Component({
  selector: 'app-movie-dashboard',
  templateUrl: './movie-dashboard.component.html',
  styleUrls: ['./movie-dashboard.component.css']
})
export class MovieDashboardComponent implements OnInit, OnDestroy {
  title: string;
  resultList: Observable<Array<OmdbiListItemModel>>;
  findForm: FormGroup;

  constructor(private service: MovieSearchService, private fb: FormBuilder) {

    this.findForm = this.fb.group({
      'title': ['']
    });

    this.resultList = this.findForm.get('title').valueChanges.pipe(
      untilDestroyed(this),
      debounceTime(500),
      tap(console.log),
      switchMap((srcValue: string): Observable<OmdbiListResponseModel> => {
        return this.service.findMovieByName(srcValue);
      }),
      tap( (data) => {
        console.log(data);
      }),
      map( (data) => {
        return data.Search;
      })
    );


  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
