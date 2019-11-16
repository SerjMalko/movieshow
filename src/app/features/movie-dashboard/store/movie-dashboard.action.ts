import { OmdbiListResponseModel } from 'src/app/model/omdbi-list-response.model';

export class FindMovieListAction {
  static readonly type = '[MovieDashboard] Load movie list by filter';

  constructor(public payload: {keyWords?: string, page?: number, nextPage?: boolean}) {
  }
}

export class FindMovieListSuccessAction {
  static readonly type = '[MovieDashboard] Save to Store after Load movie list by filter';

  constructor(public payload: {result: OmdbiListResponseModel, currentPage?: number}) {
  }
}


