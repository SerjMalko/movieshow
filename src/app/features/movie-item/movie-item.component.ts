import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OmdbiItemModel } from 'src/app/model/omdbi-item.model';
import { LOGO } from 'src/app/util/const/app.const';
import { Location } from '@angular/common';
import { ApplicationSettingService } from 'src/app/core/application-setting/application-setting.service';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent implements OnInit {

  currentMovie: Observable<OmdbiItemModel>;
  logo = LOGO;

  constructor(
    private actRoute: ActivatedRoute,
    private location: Location,
    private appService: ApplicationSettingService
  ) {
  }

  ngOnInit() {
    this.currentMovie = this.actRoute.data.pipe(
      map(data => {
        return data.item;
      })
    );
  }

  back() {
    this.location.back();
  }

  addToBasket(movie: OmdbiItemModel) {
    this.appService.addToBasketData(movie);
  }
}
