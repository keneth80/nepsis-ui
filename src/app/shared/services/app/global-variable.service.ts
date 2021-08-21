import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * @description 모든 전역 변수 및 configuration을 저장하는 service
 */
@Injectable({
    providedIn: 'root'
})
export class GlobalVariableService {
  remoteUrl: string = '';

  commonCode: any = {};

  constructor(
      private http: HttpClient
  ) { }

  retriveConfiguration(): Promise<any> {
      return this.http.get('assets/config/config.json')
          .toPromise()
          .then((res: any) => {
              if (console && console.log) {
                  console.log('retriveConfiguration : ', res);
              }
              this.remoteUrl = res.remote;
              return res;
          });
  }
}
