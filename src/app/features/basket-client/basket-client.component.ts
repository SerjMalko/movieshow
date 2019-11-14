import { Component, OnInit } from '@angular/core';
import { ApplicationSettingService } from 'src/app/core/application-setting/application-setting.service';
import { LOGO } from 'src/app/util/const/app.const';
import { Observable } from 'rxjs';
import { OmdbiListItemModel } from 'src/app/model/omdbi-list-item.model';

@Component({
  selector: 'app-basket-client',
  templateUrl: './basket-client.component.html',
  styleUrls: ['./basket-client.component.scss']
})
export class BasketClientComponent implements OnInit {

  baskets$: Observable<Array<OmdbiListItemModel>>;
  logo = LOGO;

  constructor(private appService: ApplicationSettingService) {
  }

  ngOnInit() {
    this.baskets$ = this.appService.getBasketData();
  }

  trackById(index: number, movie: OmdbiListItemModel): string {
    return movie.imdbID;
  }

  removeItem(id: string) {
    this.appService.removeBasketDataById(id);
  }

}
