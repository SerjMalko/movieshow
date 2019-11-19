import { NgxsAfterBootstrap, NgxsOnInit, State, StateContext, Store } from '@ngxs/store';
import { MovieDashboardState } from 'src/app/features/movie-dashboard/store/movie-dashboard.state';
import { BasketClientState } from 'src/app/features/basket-client/store/basket-client.state';
import { MovieItemState } from 'src/app/features/movie-item/store/movie-item.state';
import { SettingAppState } from 'src/app/core/settings/setting-app.state';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'src/app/core/local-storage/local-storage.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { SettingChangeLanguageAction } from 'src/app/core/settings/setting-app.action';
import { environment } from 'src/environments/environment.prod';
import { BASKET_LIST, EFFECTIVE_THEME } from 'src/app/util/const/app.const';
import { AddMovieToBasketAction } from 'src/app/features/basket-client/store/basket-client.action';
import { SettingAppStoreService } from 'src/app/core/settings/setting-app-store.service';

export const GeneralStates = [MovieDashboardState, BasketClientState, MovieItemState, SettingAppState];

@State({
  name: 'dashboardStateModule',
  children: GeneralStates
})
export class GeneralStateModule implements NgxsOnInit, NgxsAfterBootstrap {

  constructor(
    private translateService: TranslateService,
    // Init State Action listeners
    private settingAppStoreService: SettingAppStoreService,
    private localStorageService: LocalStorageService,
    private overlayContainer: OverlayContainer,
    private store: Store
  ) {

  }

  ngxsOnInit(ctx: StateContext<GeneralStateModule>) {
    console.log('INIT APP DATA');
    this.store.dispatch(new SettingChangeLanguageAction({lang: environment.defaultLanguage}));
    this.initSaveData();
    this.initThemeSettings();
  }

  ngxsAfterBootstrap(ctx: StateContext<GeneralStateModule>) {
    console.log('INIT APP AFTER BOOTSTRAP');
  }

  private initThemeSettings() {
    const classList = this.overlayContainer.getContainerElement()
      .classList;
    const toRemove = Array.from(classList).filter((item: string) =>
      item.includes('-theme')
    );
    if (toRemove.length) {
      classList.remove(...toRemove);
    }
    classList.add(EFFECTIVE_THEME);
  }

  /**
   * Recover data from Local Storage
   */
  private initSaveData() {
    const oldBasketData = this.localStorageService.getItem(BASKET_LIST);
    if (oldBasketData && oldBasketData.length > 0) {
      this.store.dispatch(new AddMovieToBasketAction({item: oldBasketData}));
    }
  }

}
