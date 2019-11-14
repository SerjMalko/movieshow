import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketClientComponent } from './basket-client.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BasketClientRouting } from 'src/app/features/basket-client/basket-client.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BasketClientComponent],
  imports: [
    CommonModule,
    SharedModule,
    BasketClientRouting,
    RouterModule
  ]
})
export class BasketClientModule {}
