import {RouterModule, Routes} from '@angular/router';
import {PersonalComponent} from './personal.component';
import {NgModule} from '@angular/core';
import {ModifyPasswordComponent} from "./modify-password/modify-password.component";

const routes: Routes = [
  {
    path: '',
    component: PersonalComponent
  },{
    path: 'modifyPassword',
    component: ModifyPasswordComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule {
}
