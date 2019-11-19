import { OmdbiListItemModel } from 'src/app/model/omdbi-list-item.model';

export class RemoveMovieItemAction {
  static readonly type = '[BasketClient] Delete movie from basket by ID';

  constructor(public payload: {id: string}) {
  }
}

export class AddMovieToBasketAction {
  static readonly type = '[BasketClient] Add movie to basket client by ID';

  constructor(public payload: {item: OmdbiListItemModel}) {
  }
}


export class AddMovieToBasketSuccessAction {
  static readonly type = '[BasketClient] Add movie to basket client';

  constructor(public payload: {movieId: string}) {
  }
}
