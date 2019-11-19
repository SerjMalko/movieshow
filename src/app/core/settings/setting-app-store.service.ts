import { Injectable } from '@angular/core';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { SettingChangeLanguageAction } from 'src/app/core/settings/setting-app.action';
import { TitleService } from 'src/app/core/title/title.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivationEnd, Router } from '@angular/router';
import { merge } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SettingAppStoreService {

  constructor(
    private store: Store,
    private actions: Actions,
    private titleService: TitleService,
    private translateService: TranslateService,
    private router: Router
  ) {
    this.initChangeTileListener();
  }

  private initChangeTileListener() {
    console.log('INIT LISTENER CHANGE TITLE ->');
    // MERGE ACTIONS: END OF NAVIGATE TO ROUTE AND CHANGE LANGUAGE
    merge(
      this.router.events.pipe(filter(event => event instanceof ActivationEnd)),
      this.actions.pipe(ofActionSuccessful(SettingChangeLanguageAction))
    ).subscribe((action: SettingChangeLanguageAction) => {
        console.log('CHANGE TITLE ->');
        this.titleService.setTitle(
          this.router.routerState.snapshot.root,
          this.translateService
        );
      });
  }

}
