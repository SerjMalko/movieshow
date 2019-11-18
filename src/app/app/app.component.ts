import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LANGUAGE, LOGO, MAIN_MENU } from 'src/app/util/const/app.const';
import { SettingChangeLanguageAction } from 'src/app/core/settings/setting-app.action';
import { Select, Store } from '@ngxs/store';
import { SettingAppState } from 'src/app/core/settings/setting-app.state';
import { SettingAppStoreService } from 'src/app/core/core.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  logo = LOGO;
  year: number;
  navigationSideMenu: Array<{ link, label }> = MAIN_MENU;
  languages = LANGUAGE;
  @Select(SettingAppState.currentLanguage)
  language$: Observable<string>;

  constructor(
    private settingAppStoreService: SettingAppStoreService,
    private store: Store
  ) {

  }

  ngOnInit(): void {
    this.year = new Date().getFullYear();
  }

  onLanguageSelect({value: language}) {
    this.store.dispatch(new SettingChangeLanguageAction({lang: language}));
  }

}
