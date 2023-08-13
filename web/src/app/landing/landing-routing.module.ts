import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingComponent} from "./landing.component";
import {AddComponent} from "./add/add.component";

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'index',
    component: LandingComponent,
  },
  {
    path: 'add',
    component: AddComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
