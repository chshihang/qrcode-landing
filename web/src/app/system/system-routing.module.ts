import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SystemComponent} from "./system.component";
import {EditComponent} from "./edit/edit.component";

const routes: Routes = [
  {
    path: '',
    component: SystemComponent
  },
  {
    path: 'index',
    component: SystemComponent,
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
export class SystemRoutingModule { }
