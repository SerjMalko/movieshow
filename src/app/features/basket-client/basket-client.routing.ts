import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketClientComponent } from 'src/app/features/basket-client/basket-client.component';

const routes: Routes = [
  {
    path: '',
    component: BasketClientComponent,
    data: { title: 'ams.menu.basket'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: []
})
export class BasketClientRouting {}
