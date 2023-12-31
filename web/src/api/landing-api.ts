import {ApiInjector, MockApiInterface} from "@yunzhi/ng-mock-api";
import {RequestOptions} from "@yunzhi/ng-mock-api/lib/mock-api.types";
import {HttpParams} from "@angular/common/http";
import {generatePage} from "@yunzhi/ng-common";
import {Landing} from "../entity/landing";
import {randomNumber, randomString} from "@yunzhi/utils";

export class LandingApi implements MockApiInterface {

  getInjectors(): ApiInjector[] {
    return[
      {
        url: '/landing/page',
        method: 'GET',
        description: '获取着陆页分页数据',
        result: (urlMatches: Array<string>, options: RequestOptions) => {
          const params = options.params as HttpParams;
          const page = params.get('page') ? +params.get('name')! : 0;
          const size = params.get('size') ? +params.get('size')! : 20;
          return generatePage<Landing>(page, size, index => {
            return {
              id: index! + 1,
              name: randomString('着陆页', 2),
              key:  randomString('key:', 4),
              url: randomString('url:', 20),
              createTime: randomNumber(10000000000),
            } as Landing;
          });
        }
      },
      {
        url: '/landing',
        method: 'POST',
        description: '添加Landing',
        result: (urlMatches: Array<string>, options: RequestOptions) => {
          return options.body as Landing;
        }
      },
      {
        url: '/landing/(\\d+)',
        method: 'DELETE',
        description: '删除',
        result: (urlMatches: Array<string>, options: RequestOptions) => {
        }
      },
      {
        url: '/landing/existsByKey',
        method: 'GET',
        description: 'key 唯一性验证',
        result: (urlMatches: Array<string>, options: RequestOptions) => {
          // @ts-ignore
          const key = options.params.get('key');
          if (key == '123') {
            return true;
          }
          return false;
        }
      },
      {
        url: '/landing/(\\d+)',
        method: 'GET',
        description: '获取landing',
        result: (urlMatches: Array<string>, options: RequestOptions) => {
          return {
            id: 1,
            name: 'landingName',
            key: '123',
            url: 'http://localhost:8080'
          }
        }
      },
      {
        url: '/landing/(\\d+)',
        method: 'PATCH',
        description: '更新landing',
        result: (urlMatches: Array<string>, options: RequestOptions) => {
          return {...options.body, ...{id: urlMatches[0]}}
        }
      }
    ]
  }
}
