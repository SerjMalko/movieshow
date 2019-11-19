// Map the router snapshot to { url, params, queryParams }
import { RouterStateSerializer } from '@ngxs/router-plugin';
import { RouterStateSnapshot } from '@angular/router';
import { RouterStateParams } from 'src/app/core/router/router.state';

// https://www.ngxs.io/plugins/router
export class CustomRouterStateSerializer implements RouterStateSerializer<RouterStateParams> {
  serialize(routerState: RouterStateSnapshot): RouterStateParams {
    const {
            url,
            root: { queryParams }
          } = routerState;

    let { root: route } = routerState;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const { params } = route;

    return { url, params, queryParams };
  }
}
