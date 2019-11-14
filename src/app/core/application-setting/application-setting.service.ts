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

@Injectable()
export class ApplicationSettingService {

  private _lang$;
  private _basketData$;
  private _basketData: Array<OmdbiListItemModel> = [];

  constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private notificationService: NotificationService,
    private overlayContainer: OverlayContainer
  ) {
    this._lang$ = new BehaviorSubject<string>(environment.defaultLanguage);
    this._basketData$ = new BehaviorSubject<Array<OmdbiListItemModel>>([]);
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
      this.addToBasketData(oldBasketData);
    }
  }

  selectLanguage(lang: string) {
    this._lang$.next(lang);
    this.translateService.use(lang);
  }

  getLanguage(): Observable<string> {
    return this._lang$.asObservable();
  }

  getBasketData(): Observable<Array<OmdbiItemModel>> {
    return this._basketData$.asObservable();
  }

  addToBasketData(data: OmdbiListItemModel | Array<OmdbiListItemModel>): boolean {

    if (data instanceof Array) {
      this._basketData.push(...data);
    } else {

      const result = this._basketData.find((item) => {
        return item.imdbID === data.imdbID;
      });

      // Check if exist in a basket
      if (result) {
        this.notificationService.warn(this.translateService.instant('asm.message.movie-exist-in-basket', {title: data.Title}));
        return false;
      }

      this._basketData.push(data);
      this.notificationService.success(this.translateService.instant('ams.dashboard.message.add-to-basket', {title: data.Title}));
      return true;
    }

    this.localStorageService.setItem(BASKET_LIST, this._basketData);
    this._basketData$.next(this._basketData);
  }

  removeBasketDataById(id: string) {
    this._basketData = this._basketData.filter(x => {
      return x.imdbID !== id;
    });
    this.localStorageService.setItem(BASKET_LIST, this._basketData);
    this._basketData$.next(this._basketData);
  }

}
