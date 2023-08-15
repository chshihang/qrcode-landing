import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import {LandingRoutingModule} from "./landing-routing.module";
import {YzPageModule, YzSizeModule} from "@yunzhi/ng-common";
import { AddComponent } from './add/add.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {QrcodeModule} from "../../common/qrcode/qrcode.module";
import { EditComponent } from './edit/edit.component';



@NgModule({
  declarations: [
    LandingComponent,
    AddComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    YzPageModule,
    YzSizeModule,
    ReactiveFormsModule,
    QrcodeModule,
    FormsModule
  ]
})
export class LandingModule { }
