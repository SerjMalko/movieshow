import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LocalStorageService } from './local-storage/local-storage.service';
import { NotificationService } from './notifications/notification.service';
import { NgxsStoreModule } from 'src/app/store.module';
import { CustomRouterStateSerializer } from 'src/app/core/router/custom-serializer';
import { RouterStateSerializer } from '@ngxs/router-plugin';
import { AppErrorHandler } from 'src/app/core/error-handler/app-error-handler.service';
import { HttpErrorInterceptor } from 'src/app/core/http-interceptors/http-error.interceptor';
import { TitleService } from './title/title.service';
import { SettingAppStoreService } from './settings/setting-app-store.service';

export {
  LocalStorageService,
  TitleService,
  SettingAppStoreService,
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

    NgxsStoreModule,

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
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    { provide: ErrorHandler, useClass: AppErrorHandler },
  ]
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
