import { Action, Selector, State, StateContext } from '@ngxs/store';
import { LANGUAGE_DATA } from 'src/app/util/const/app.const';
import { SettingChangeLanguageAction } from 'src/app/core/settings/setting-app.action';
import { TranslateService } from '@ngx-translate/core';

export interface SettingAppStateModel {
  currentLanguage?: string;
}

@State<SettingAppStateModel>({
  name: 'setting',
  defaults: {
    currentLanguage: LANGUAGE_DATA.RU
  }
})
export class SettingAppState {

  @Selector()
  static currentLanguage(state: SettingAppStateModel): string {
    return state.currentLanguage;
  }

  constructor(
    private translateService: TranslateService
  ) {

  }

  @Action(SettingChangeLanguageAction)
  changeLanguage(ctx: StateContext<SettingAppStateModel>, {payload}: { payload: { lang: string } }) {
    this.translateService.use(payload.lang);
    ctx.patchState({
      currentLanguage: payload.lang
    });
  }

}
