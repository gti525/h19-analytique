import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { Ad } from './ad';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    Ad
  ],
  declarations: [Ad]
})
export class AdModule {}
