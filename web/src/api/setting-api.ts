import {ApiInjector, MockApiInterface} from "@yunzhi/ng-mock-api";
import {RequestOptions} from "@yunzhi/ng-mock-api/lib/mock-api.types";

export class SettingApi implements MockApiInterface {
  getInjectors(): ApiInjector[] {
    return [
      {
        url: '/setting/url',
        method: 'GET',
        description: '获取系统URL',
        result: (urlMatches: Array<string>, options: RequestOptions) => {
          return 'http://localhost:1234';
        }
      },
      {
        url: '/setting',
        method: 'PATCH',
        description: '修改系统URL',
        result: (urlMatches: Array<string>, options: RequestOptions) => {
          return options.body;
        }
      },
    ];
  }

}
