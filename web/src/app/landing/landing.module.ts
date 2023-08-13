import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import {LandingRoutingModule} from "./landing-routing.module";
import {YzPageModule, YzSizeModule} from "@yunzhi/ng-common";
import { AddComponent } from './add/add.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    LandingComponent,
    AddComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    YzPageModule,
    YzSizeModule,
    ReactiveFormsModule
  ]
})
export class LandingModule { }