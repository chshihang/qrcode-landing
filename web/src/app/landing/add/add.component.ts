import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LandingService} from "../../../service/landing.service";
import {Landing} from "../../../entity/landing";
import {CommonService} from "../../../service/common.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonValidator} from "../../../common/validators/common-validator";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  formGroup = new FormGroup({});
  formKeys = {
    name: 'name',
    key: 'key',
    url: 'url'
  };

  constructor(private landingService: LandingService,
              private router: Router,
              private route: ActivatedRoute,
              private commonValidator: CommonValidator,
              private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.formGroup.addControl(this.formKeys.name,
      new FormControl('', [Validators.required]));
    this.formGroup.addControl(this.formKeys.key,
      new FormControl('', [Validators.required], this.commonValidator.landingUniqueKey()));
    this.formGroup.addControl(this.formKeys.url,
      new FormControl('', [Validators.required, CommonValidator.httpFormatCheck]));
  }
  onSubmit() {
    // @ts-ignore
    this.landingService.add(this.formGroup.value)
      .subscribe(landing => {
        console.log('Landing back', landing);
        this.commonService.success(() => {
          console.log('this.route.url', );
          this.router.navigate(['./../'], {
            relativeTo: this.route
          });
        }, '', '操作成功');
      });
  }
}
