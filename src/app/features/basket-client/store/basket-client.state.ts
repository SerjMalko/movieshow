import { Action, Selector, State, StateContext } from '@ngxs/store';
import { BASKET_LIST } from 'src/app/util/const/app.const';
import { OmdbiListItemModel } from 'src/app/model/omdbi-list-item.model';
import { TranslateService } from '@ngx-translate/core';
import { MovieSearchService } from 'src/app/services/movie-search.service';
import { AddMovieToBasketAction, RemoveMovieItemAction } from 'src/app/features/basket-client/store/basket-client.action';
import { NotificationService } from 'src/app/core/notifications/notification.service';
import { LocalStorageService } from 'src/app/core/local-storage/local-storage.service';

export interface BasketClientStateModel {
  saveMoviesList?: Array<OmdbiListItemModel>;
}

@State<BasketClientStateModel>({
  name: 'basketClient',
  defaults: {
    saveMoviesList: []
  }
})
export class BasketClientState {

  @Selector()
  static saveMoviesList(state: BasketClientStateModel): Array<OmdbiListItemModel> {
    return state.saveMoviesList;
  }

  constructor(
    private translateService: TranslateService,
    private movieService: MovieSearchService,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService
  ) {

  }

  @Action(RemoveMovieItemAction)
  removeMovieItem(ctx: StateContext<BasketClientStateModel>, {payload}: { payload: { id: string } }) {
    const basketData = ctx.getState().saveMoviesList.filter(x => {
      return x.imdbID !== payload.id;
    });
    this.localStorageService.setItem(BASKET_LIST, basketData);

    ctx.patchState({
      saveMoviesList: basketData
    });

  }

  @Action(AddMovieToBasketAction)
  addMovieToBasket(ctx: StateContext<BasketClientStateModel>, {payload}: { payload: { item: OmdbiListItemModel } }) {
    const data = payload.item;
    const basketData = [...ctx.getState().saveMoviesList];
    if (data instanceof Array) {
      basketData.push(...data);
    } else {

      const result = basketData.find((item) => {
        return item.imdbID === data.imdbID;
      });

      // Check if exist in a basket
      if (result) {
        this.notificationService.warn(this.translateService.instant('asm.message.movie-exist-in-basket', {title: data.Title}));
        return ctx;
      }

      basketData.push(data);
      this.notificationService.success(this.translateService.instant('ams.dashboard.message.add-to-basket', {title: data.Title}));
    }

    this.localStorageService.setItem(BASKET_LIST, basketData);

    ctx.patchState({
      saveMoviesList: [...basketData]
    });

  }

}
