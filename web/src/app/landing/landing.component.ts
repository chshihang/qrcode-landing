import {Component, OnDestroy, OnInit} from '@angular/core';
import {LandingService} from "../../service/landing.service";
import {Page} from "@yunzhi/ng-common";
import {Landing} from "../../entity/landing";
import {Assert, getDefaultWhenValueIsInValid} from "../../common/utils";

import {ActivatedRoute, Router} from "@angular/router";
import {config} from "../../conf/config";
import {FormControl} from "@angular/forms";
import {CommonService} from "../../service/common.service";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  pageData = new Page<Landing>();
  queryParams = {} as QueryParams;
  isShowQrcode = false;
  landing: Landing;
  nameControl = new FormControl(null);
  keyControl = new FormControl(null);
  constructor(private landingService: LandingService,
              private route: ActivatedRoute,
              private commonService: CommonService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: QueryParams) => {
      this.queryParams = params;
      this.loadPage(params);
    });
  }

  private loadPage(params?: QueryParams) {
    this.landingService.page({
      page: +params.page,
      size: +params.size,
      name: params.name,
      key: params.key
    }).subscribe(page => {
        this.validate(page);
        this.pageData = page;
      });
  }

  private validate(page: Page<Landing>) {
    page.content.forEach(landing => {
      Assert.isNotNullOrUndefined(landing.id, 'id不能为空');
      Assert.isNotNullOrUndefined(landing.name, 'name不能为空');
      Assert.isNotNullOrUndefined(landing.key, 'key不能为空');
      Assert.isNotNullOrUndefined(landing.url, 'url不能为空');
      Assert.isNotNullOrUndefined(landing.createTime, 'createTime不能为空');
    });
  }


  onFormChange() {
    console.log('onFormChange');
    this.reload({name: this.nameControl.value, key: this.keyControl.value});
  }

  onQrcodeOpen(landing: Landing) {
    this.landing = landing;
    this.isShowQrcode = true;
  }
  onSizeChange(size: number): void {
    console.log('onSizeChange', size);
    this.reload({size: size.toString()});
  }


  /**
   * 改变每页大小
   * @param page
   * @constructor
   */
  onPageChange(page: number): void {
    console.log('onPageChange', page);
    this.reload({page: page.toString()});
  }

  reload(queryParams: QueryParams): void {
    this.queryParams = {...this.queryParams, ...queryParams};
    this.loadPage(this.queryParams);
  }

  onQrcodeClose() {
    this.isShowQrcode = false;
  }

  onDelete(id: number, index: number) {
    this.commonService.confirm((confirm: boolean) => {
      if (confirm) {
        this.landingService.deleteById(id).subscribe(() => {
          this.pageData.content.splice(index, 1);
          this.commonService.success();
          if (this.pageData.content.length === 0) {
            this.onPageChange(+this.queryParams.page);
          }
        });
      }
    });
  }
}
type QueryParams = {
  page?: string,
  size?: string,
  name?: string,
  key?: string
}
