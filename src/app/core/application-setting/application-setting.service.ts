import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { TranslateService } from '@ngx-translate/core';
import { OmdbiItemModel } from 'src/app/model/omdbi-item.model';
import { OmdbiListItemModel } from 'src/app/model/omdbi-list-item.model';
import { LocalStorageService } from 'src/app/core/local-storage/local-storage.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BASKET_LIST, EFFECTIVE_THEME } from 'src/app/util/const/app.const';
import { NotificationService } from 'src/app/core/notifications/notification.service';
import { AddMovieToBasketAction } from 'src/app/features/basket-client/store/basket-client.action';
import { Store } from '@ngxs/store';

@Injectable({providedIn: 'root'})
export class ApplicationSettingService {

  private _lang$;

  constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private notificationService: NotificationService,
    private overlayContainer: OverlayContainer,
    private store: Store
  ) {
    this._lang$ = new BehaviorSubject<string>(environment.defaultLanguage);
    this.translateService.use(environment.defaultLanguage);
    this.initSaveData();
    this.initThemeSettings();
  }

  initThemeSettings() {
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
  initSaveData() {
    const oldBasketData = this.localStorageService.getItem(BASKET_LIST);
    if (oldBasketData && oldBasketData.length > 0) {
      this.store.dispatch(new AddMovieToBasketAction({item: oldBasketData}));
    }
  }

  selectLanguage(lang: string) {
    this._lang$.next(lang);
    this.translateService.use(lang);
  }

  getLanguage(): Observable<string> {
    return this._lang$.asObservable();
  }


}
