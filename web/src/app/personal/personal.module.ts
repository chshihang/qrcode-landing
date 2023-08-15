import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonalComponent} from './personal.component';
import {PersonalRoutingModule} from './personal-routing.module';
import {ModifyPasswordComponent} from "./modify-password/modify-password.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {YzModalModule} from "@yunzhi/ng-common";

/**
 * 个人中心
 */
@NgModule({
  declarations: [
    PersonalComponent,
    ModifyPasswordComponent
  ],
  imports: [
    CommonModule,
    PersonalRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    YzModalModule,
  ]
})
export class PersonalModule {
}
