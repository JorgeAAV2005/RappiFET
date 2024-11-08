import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearsalaPageRoutingModule } from './crearsala-routing.module';

import { CrearsalaPage } from './crearsala.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearsalaPageRoutingModule
  ],
  declarations: [CrearsalaPage]
})
export class CrearsalaPageModule {}
