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

  retriveConfiguration() {
      return this.http.get('assets/config/config.json');
  }
}
