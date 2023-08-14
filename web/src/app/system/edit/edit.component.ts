import {Component, OnInit} from '@angular/core';
import {SystemService} from "../../../service/system.service";
import {Assert} from "../../../common/utils";
import {FormControl, Validators} from "@angular/forms";
import {CommonValidator} from "../../../common/validators/common-validator";
import * as url from "url";
import {CommonService} from "../../../service/common.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {


  constructor(private systemService: SystemService,
              private commonService: CommonService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  urlControl = new FormControl<string>('',
    [Validators.required, CommonValidator.httpFormatCheck]);

  ngOnInit(): void {
    this.systemService.getSystemUrl().subscribe(url => {
      Assert.isNotNullOrUndefined(url, '值错误');
      this.urlControl.setValue(url);
    })
  }

  onSubmit() {
    this.systemService.updateSystemUrl(this.urlControl.value)
      .subscribe((url) => {
        this.systemService.setSystemUrl(url);
        this.commonService.success(() => {
          this.router.navigate(['./../'],{
            relativeTo: this.route
          })
        }, '', '操作成功');
      });
  }
}
