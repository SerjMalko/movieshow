import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MovieItem} from '../features/movie-dashboard/movie-dashboard.component';
import {OmdbiListResponseModel} from '../model/omdbi-list-response.model';

@Injectable({providedIn: 'root'})
export class MovieSearchService {

  serviceUrl: string;

  constructor(private httpClient: HttpClient) {
    this.serviceUrl = environment.omdbApiKUrl + '/?apikey=' + environment.omdbApiKey;
  }

  findMovieByName(title): Observable<OmdbiListResponseModel> {
    return this.httpClient.get<OmdbiListResponseModel>(this.serviceUrl + '&s=' + title);
  }


}
