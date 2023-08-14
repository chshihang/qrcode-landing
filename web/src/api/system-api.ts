import {ApiInjector, MockApiInterface} from "@yunzhi/ng-mock-api";
import {RequestOptions} from "@yunzhi/ng-mock-api/lib/mock-api.types";

export class SystemApi implements MockApiInterface {
  getInjectors(): ApiInjector[] {
    return [
      {
        url: '/system/url',
        method: 'GET',
        description: '获取系统URL',
        result: (urlMatches: Array<string>, options: RequestOptions) => {
          return 'http://localhost:1234';
        }
      }
    ];
  }

}
