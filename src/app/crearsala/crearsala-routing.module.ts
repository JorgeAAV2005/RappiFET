import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearsalaPage } from './crearsala.page';

const routes: Routes = [
  {
    path: '',
    component: CrearsalaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearsalaPageRoutingModule {}
