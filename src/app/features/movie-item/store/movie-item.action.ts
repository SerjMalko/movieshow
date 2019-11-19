export class OpenMovieAction {
  static readonly type = '[Movie Item] Open movie description';

  constructor(public payload: {movieId: string}) {
  }
}
