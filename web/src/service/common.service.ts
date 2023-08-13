import { Injectable } from '@angular/core';
import {randomNumber} from '../common/utils';
import {NavigationEnd, Router} from '@angular/router';
import {BaseMenu} from '../common/base-menu';
import {BehaviorSubject, Observable} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';
import {filter} from 'rxjs/operators';
import swal, {SweetAlertIcon, SweetAlertResult} from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private menus = [
    {name: '首页', url: 'dashboard', icon: 'fas fa-paper-plane'} as BaseMenu,
    {name: '着陆页管理', url: 'landingPage', icon: 'fa-solid fa-plane-arrival'} as BaseMenu,
    {name: '系统', url: 'system', icon: 'fa-solid fa-gear'} as BaseMenu,
    {name: '个人中心', url: 'personal', icon: 'fas fa-user'} as BaseMenu,
  ];

  /** 当前路由是否能后退观察者 */
  private canBack$ = new BehaviorSubject<boolean>(false);
  /** 当前路由 */
  private currentUrl: string | undefined;
  /** 当前是否处于后退状态 */
  private isBack = false;
  /** 所有路由信息 */
  public routeStates: Array<{ url: string, state: { [k: string]: any } | undefined }> = [];

  constructor(private router: Router,
              private domSanitizer: DomSanitizer) {
    /** 订阅路由事件 */
    this.router.events
      /** 过滤：路由结束事件 */
      .pipe(filter((event) => {
        return event instanceof NavigationEnd;
      }))
      /** 订阅路由结束后执行的方法 */
      .subscribe((route) => {
        const routeState = route as unknown as NavigationEnd;
        this.currentUrl = routeState.urlAfterRedirects;

        if (this.isBack) {
          /** 如果处于后退状态，清空状态 */
          /** 获取完历史参数以后再清除后退状态 */
          this.isBack = false;
        } else if (!this.currentUrl.startsWith('/login')) {
          /** 如果不是认证模块，将当前路由添加到数组中 */
          if (this.routeStates.length >= 50) {
            this.routeStates.splice(0, 1);
          }
          this.routeStates.push({url: this.currentUrl, state: this.router.getCurrentNavigation()?.extras.state});
        }

        /** 更新是否能后退信息 */
        this.canBack$.next(this.routeStates.length >= 2);
      });
  }

  /**
   * 将参数转换为路由参数
   * @param params 参数
   * @return 适用于route的Params
   */
  public static convertToRouteParams(params: { [header: string]: string | string[] | number | number[] | null | undefined; })
    : { [header: string]: string | string[]; } {
    const queryParams = {} as { [header: string]: string | string[]; };
    // 过滤掉undefined及null的数据
    for (const key in params) {
      if (params[key] !== undefined) {
        const value = params[key];
        if (value !== undefined || value !== null) {
          if (typeof value === 'string') {
            queryParams[key] = value;
          } else if (typeof value === 'number') {
            queryParams[key] = value.toString();
          } else if (Array.isArray(value)) {
            queryParams[key] = [];
            (value as []).forEach(v => {
              if (typeof v === 'number') {
                (queryParams[key] as string[]).push((v as number).toString());
              } else {
                (queryParams[key] as string[]).push(v);
              }
            });
          }
        }
      }
    }
    return queryParams;
  }

  /**
   * 使用查询查询，重新加载当前路由，
   * 在重新加载前将过滤掉undefined及null的属性
   * 同时将number类型转换为string
   *
   * @example
   * 支持数字或是字符串类型
   * reloadByParam({page: 1, size: '20'});
   * 支持undefined或null值
   * reloadByParam({page: undefined, size: null});
   * 支持数字或字符串数组
   * reloadByParam({page: '1', size: 20, ids: [1, 2, 3]};
   * reloadByParam({page: '1', size: 20, ids: ['1', '2', '3']};
   *
   * @param param 查询参数
   */
  reloadByParam(params: { [header: string]: string | string[] | number | number[] | null | undefined; },
                extra?: { forceReload?: boolean }): Promise<boolean> {
    const queryParams = CommonService.convertToRouteParams(params);
    if (extra && extra.forceReload) {
      queryParams['_reloadId'] = randomNumber().toString();
    }
    return this.router.navigate(['./', {...queryParams}]);
  }

  getConfirmTitle(string1: string | undefined, string2: string | undefined): string {
    let result = '';
    const stringArray = [];
    stringArray.push(string1);
    stringArray.push(string2);
    for (const item of stringArray) {
      if (result === '') {
        result = result + '删除' + item;
      } else {
        result = result + '（' + item + '）';
      }
    }
    return result;
  }


  /**
   * 判断当前菜单是否激活
   * @param menu 菜单
   */
  active(menu: BaseMenu): boolean {
    return this.router.isActive(menu.url, false);
  }

  getMenus(): BaseMenu[] {
    return this.menus;
  }

  canBack(): Observable<boolean> {
    return this.canBack$;
  }

  /** 路由后退 */
  back(): void {
    /** 清空当前的路由信息 */
    this.clearCurrentRoute();
    if (this.routeStates.length > 0) {
      /** 获取待后退的url */
      const state = this.routeStates[this.routeStates.length - 1];
      /** 设置后退状态 */
      this.isBack = true;
      /** 路由跳转 */
      this.router.navigateByUrl(state.url, {state: state.state});
    }
  }

  /**
   * 清空当前路由信息
   */
  clearCurrentRoute(): void {
    this.routeStates.pop();
  }

  error(param: () => void, s: string, 注销失败: string) {
    // todo:
  }
  /**
   * 操作成功提示框
   * @param callback    回调
   * @param description 描述
   * @param title       标题
   */
  success(callback?: () => void, description: string = '', title: string = '操作成功', options = {confirmButtonText: '确定'}): void {
    swal.fire({
      titleText: title,
      text: description,
      icon: 'success',
      background: '#F7F8FA',
      allowOutsideClick: false,
      confirmButtonText: options.confirmButtonText,
      confirmButtonColor: '#007BFF',
      showCancelButton: false
    }).then((result: SweetAlertResult) => {
      if (result.value) {
        // 执行回调
        if (callback) {
          callback();
        }
      }
    });
  }
}
