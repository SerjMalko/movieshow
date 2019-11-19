import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OmdbiItemModel } from 'src/app/model/omdbi-item.model';
import { LOGO } from 'src/app/util/const/app.const';
import { Location } from '@angular/common';
import { AddMovieToBasketAction } from 'src/app/features/basket-client/store/basket-client.action';
import { Select, Store } from '@ngxs/store';
import { MovieItemState } from 'src/app/features/movie-item/store/movie-item.state';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent implements OnInit {

  @Select(MovieItemState.movieItem)
  currentMovie: Observable<OmdbiItemModel>;
  logo = LOGO;

  constructor(
    private location: Location,
    private store: Store
  ) {
  }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }

  addToBasket(movie: OmdbiItemModel) {
    this.store.dispatch(new AddMovieToBasketAction({item: movie}));
  }
}
