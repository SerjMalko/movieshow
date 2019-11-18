export class SettingChangeLanguageAction {
  static readonly type = '[Setting] Change Language';

  constructor(public payload: { lang: string }) {
  }
}
