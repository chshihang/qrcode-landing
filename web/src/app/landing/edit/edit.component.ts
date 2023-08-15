import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Landing} from "../../../entity/landing";
import {Assert} from "../../../common/utils";
import {LandingService} from "../../../service/landing.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonValidator} from "../../../common/validators/common-validator";
import {CommonService} from "../../../service/common.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  id: number;
  formGroup = new FormGroup({});
  formKeys = {
    name: 'name',
    key: 'key',
    url: 'url'
  };
  constructor(private route: ActivatedRoute,
              private router: Router,
              private commonValidator: CommonValidator,
              private commonService: CommonService,
              private landingService: LandingService) {
  }
  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    Assert.isInteger(id, '类型错误');
    this.id = id;
    this.buildFormGroup(id);
    this.landingService.getById(id)
      .subscribe(landing => {
        this.validate(landing);
        this.setFormGroupValue(landing);
      });
  }

  private buildFormGroup(id: any) {
    this.formGroup.addControl(this.formKeys.name,
      new FormControl('', [Validators.required]));
    this.formGroup.addControl(this.formKeys.key,
      new FormControl('', [Validators.required], this.commonValidator.landingUniqueKey(id)));
    this.formGroup.addControl(this.formKeys.url,
      new FormControl('', [Validators.required, CommonValidator.httpFormatCheck]));
  }

  private validate(landing: Landing) {
    Assert.isNotNullOrUndefined(landing.id, '数据错误');
    Assert.isNotNullOrUndefined(landing.name, '数据错误');
    Assert.isNotNullOrUndefined(landing.key, '数据错误');
    Assert.isNotNullOrUndefined(landing.url, '数据错误');
  }

  private setFormGroupValue(landing: Landing) {
    this.formGroup.setValue({
      name: landing.name,
      key: landing.key,
      url: landing.url
    })
  }

  onSubmit() {
    this.landingService.update(this.id, this.formGroup.value as {name: string, key: string, url: string})
      .subscribe(landing => {
        this.commonService.success(() => {
          this.router.navigate(['./../../'], {
            relativeTo: this.route
          });
        }, '', '操作成功');
      });
  }
}
