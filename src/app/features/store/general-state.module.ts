import {State} from '@ngxs/store';
import { MovieDashboardState } from 'src/app/features/movie-dashboard/store/movie-dashboard.state';
import { BasketClientState } from 'src/app/features/basket-client/store/basket-client.state';
import { MovieItemState } from 'src/app/features/movie-item/store/movie-item.state';


export const GeneralStates = [MovieDashboardState, BasketClientState, MovieItemState];

@State({
  name: 'dashboardStateModule',
  children: GeneralStates
})
export class GeneralStateModule {
}
