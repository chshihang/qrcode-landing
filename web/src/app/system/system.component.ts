import {Component, OnInit} from '@angular/core';
import {SystemService} from "../../service/system.service";
import {Assert} from "../../common/utils";

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {

  url: string;

  constructor(private systemService: SystemService) {
  }

  ngOnInit(): void {
    this.systemService.getSystemUrl().subscribe(url => {
      Assert.isNotNullOrUndefined(url, '值错误');
      this.url = url;
    })
  }

}
