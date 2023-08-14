import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login/login.component';
import {AuthRoutingModule} from './auth-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthComponent} from './auth.component';
import {YzSubmitButtonModule} from "@yunzhi/ng-common";



@NgModule({
  declarations: [AuthComponent, LoginComponent],
  exports: [
    AuthComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    YzSubmitButtonModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
