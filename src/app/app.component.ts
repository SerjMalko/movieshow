import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationSettingService } from 'src/app/core/core.module';
import { LANGUAGE, LOGO, MAIN_MENU } from 'src/app/util/const/app.const';

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
  language$: Observable<string>;

  constructor(private appService: ApplicationSettingService) {

  }

  ngOnInit(): void {
    this.language$ = this.appService.getLanguage();
    this.year = new Date().getFullYear();
  }

  onLanguageSelect({value: language}) {
    console.log('language ->', language);
    this.appService.selectLanguage(language);
  }

}
