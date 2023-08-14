import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrcodeComponent } from './qrcode.component';
import {YzMaskModule, YzModalModule} from "@yunzhi/ng-common";
import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  declarations: [
    QrcodeComponent
  ],
  exports: [
    QrcodeComponent
  ],
  imports: [
    CommonModule,
    YzMaskModule,
    YzModalModule,
    QRCodeModule
  ]
})
export class QrcodeModule { }
