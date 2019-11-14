import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OmdbiListResponseModel } from '../model/omdbi-list-response.model';
import { OmdbiItemModel } from 'src/app/model/omdbi-item.model';

@Injectable({providedIn: 'root'})
export class MovieSearchService {

  serviceUrl: string;

  constructor(private httpClient: HttpClient) {
    this.serviceUrl = environment.omdbApiKUrl + '/?apikey=' + environment.omdbApiKey;
  }

  findMovieByName(data: { s, p? }): Observable<OmdbiListResponseModel> {
    const reqUrl = this.serviceUrl + '&s=' + data.s + ((data.p) ? ('&page=' + data.p) : '');
    console.log('reqUrl ->', reqUrl);
    return this.httpClient.get<OmdbiListResponseModel>(reqUrl);
  }

  getMovieById(id: string): Observable<OmdbiItemModel> {
    console.log('id ->', id);
    return this.httpClient.get<OmdbiItemModel>(this.serviceUrl + '&i=' + id);
  }
}
