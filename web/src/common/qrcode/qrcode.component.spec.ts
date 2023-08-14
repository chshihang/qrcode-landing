import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeComponent } from './qrcode.component';
import {YzMaskModule, YzModalModule} from "@yunzhi/ng-common";
import {QRCodeModule} from "angularx-qrcode";
import {TestModule} from "../../app/test/test.module";
import {Landing} from "../../entity/landing";

describe('QrcodeComponent', () => {
  let component: QrcodeComponent;
  let fixture: ComponentFixture<QrcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrcodeComponent ],
      imports: [
        YzModalModule,
        YzMaskModule,
        QRCodeModule,
        TestModule
      ],
      teardown: {
        destroyAfterEach: false
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrcodeComponent);
    component = fixture.componentInstance;
    component.landing = {
      name: '着陆页',
      key: 'abc',
      url: 'http://localhost:xxx'
    } as Landing;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
