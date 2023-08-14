import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SettingComponent} from "./setting.component";
import {EditComponent} from "./edit/edit.component";

const routes: Routes = [
  {
    path: '',
    component: SettingComponent
  },
  {
    path: 'index',
    component: SettingComponent,
  },
  {
    path: 'edit',
    component: EditComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
