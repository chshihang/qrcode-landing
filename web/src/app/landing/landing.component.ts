import {Component, OnDestroy, OnInit} from '@angular/core';
import {LandingService} from "../../service/landing.service";
import {Page} from "@yunzhi/ng-common";
import {Landing} from "../../entity/landing";
import {Assert, getDefaultWhenValueIsInValid} from "../../common/utils";

import {ActivatedRoute, Router} from "@angular/router";
import {config} from "../../conf/config";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  pageData = new Page<Landing>();
  queryParams = {} as {
    page?: number,
    size?: number
  }
  isShowQrcode = false;
  landing: Landing;
  constructor(private landingService: LandingService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: { page?: string, size?: string }) => {
      this.loadPage(params);
    });
  }

  private loadPage(params?: { page?: string, size?: string }) {
    // 获取page\size查询参数
    const page = +getDefaultWhenValueIsInValid(+params?.page, 0);
    const size = +getDefaultWhenValueIsInValid(+params?.size, config.size);
    this.queryParams.page = page;
    this.queryParams.size = size;

    this.landingService.page({page, size})
      .subscribe(page => {
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

  onQrcodeOpen(landing: Landing) {
    this.landing = landing;
    this.isShowQrcode = true;
  }


  onSizeChange(size: number): void {
    this.queryParams.size = size;
    this.reload();
  }

  /**
   * 改变每页大小
   * @param page
   * @constructor
   */
  onPageChange(page: number): void {
    this.queryParams.page = page;
    this.reload();
  }

  reload(): void {
    this.loadPage({page: this.queryParams.page.toString(), size: this.queryParams.size.toString()});
  }

  onQrcodeClose() {
    this.isShowQrcode = false;
  }
}
