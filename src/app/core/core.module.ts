import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ApplicationSettingService } from 'src/app/core/application-setting/application-setting.service';
import { LocalStorageService } from './local-storage/local-storage.service';
import { NotificationService } from './notifications/notification.service';

export {
  ApplicationSettingService,
  LocalStorageService,
  NotificationService
};

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `./assets/i18n/`,
    '.json'
  );
}

@NgModule({
  imports: [
    // angular
    CommonModule,
    HttpClientModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [TranslateModule],
  declarations: [],
  providers: [ApplicationSettingService]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
      parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
