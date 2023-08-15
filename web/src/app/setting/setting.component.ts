import {Component, OnInit} from '@angular/core';
import {SettingService} from "../../service/setting.service";
import {Assert} from "../../common/utils";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  url: string;

  constructor(private systemService: SettingService) {
  }

  ngOnInit(): void {
    this.systemService.getSystemUrl().subscribe(url => {
      Assert.isNotNullOrUndefined(url, '值错误');
      this.url = url;
    })
  }

}
