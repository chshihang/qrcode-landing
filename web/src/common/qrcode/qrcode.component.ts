import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SystemService} from "../../service/system.service";
import {Landing} from "../../entity/landing";
import { Assert } from '../utils';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent implements OnInit {

  systemUrl: string;
  key: string;
  url: string;

  @Input()
  qrcodeWidth = 400;

  @Input()
  modalWidth = '500px';

  init = false;

  @Output()
  closeEvent = new EventEmitter<void>();

  @Input()
  landing: Landing;
  constructor(private systemService: SystemService) {
  }
  ngOnInit() {
    Assert.isNotNullOrUndefined(this.landing, '值错误');
    Assert.isNotNullOrUndefined(this.landing.key, '值错误');
    this.key = this.landing.key;
    this.systemService.getSystemUrl()
      .subscribe(systemUrl => {
        Assert.isNotNullOrUndefined(systemUrl, '值错误');
        this.setUrl(systemUrl);
      });
  }

  private setUrl(systemUrl: string) {
    this.systemUrl = systemUrl;
    if (systemUrl.endsWith('/')) {
      this.url = systemUrl + this.key;
    } else {
      this.url = systemUrl + '/' + this.key;
    }
    this.init = true;
  }

  onClose() {
    this.closeEvent.emit(null);
  }
}
