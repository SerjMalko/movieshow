import { Component, OnInit } from '@angular/core';
import { LOGO } from 'src/app/util/const/app.const';
import { Observable } from 'rxjs';
import { OmdbiListItemModel } from 'src/app/model/omdbi-list-item.model';
import { Select, Store } from '@ngxs/store';
import { BasketClientState } from 'src/app/features/basket-client/store/basket-client.state';
import { RemoveMovieItemAction } from 'src/app/features/basket-client/store/basket-client.action';

@Component({
  selector: 'app-basket-client',
  templateUrl: './basket-client.component.html',
  styleUrls: ['./basket-client.component.scss']
})
export class BasketClientComponent implements OnInit {

  logo = LOGO;
  @Select(BasketClientState.saveMoviesList)
  basketList: Observable<Array<OmdbiListItemModel>>;

  constructor(private store: Store) {
  }

  ngOnInit() {
  }

  trackById(index: number, movie: OmdbiListItemModel): string {
    return movie.imdbID;
  }

  removeItem(id: string) {
    this.store.dispatch(new RemoveMovieItemAction({id: id}));
  }

}
