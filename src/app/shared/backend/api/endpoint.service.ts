import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, concatMap, first, shareReplay } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { GlobalVariableService } from '../../services/app/global-variable.service';
import { GroupCode, Code, CommonCode } from '../models/group-code';
import { UserModel } from '../../models/user-model';
import { groupCodeModelMapper, codeModelMapper, listCodeMapper } from '../../mappers';
import { GroupCodeParam } from '../params/group-code-param';

const queryString = (params: any) => Object.keys(params).map(key => key + '=' + params[key]).join('&');

// backend api가 정의되는 service
@Injectable({
  providedIn: 'root'
})
export class EndpointService {
  private PRE_FIX = 'api/cm7710';

  constructor(
    private http: HttpClient,
    private globalVarialbe: GlobalVariableService
  ) {
  }

  login(userId: string, password: string) {
    return this.http.post<any>(`${this.globalVarialbe.remoteUrl}/login`, 
      { username: userId, password },
      { withCredentials: true, observe: 'response' }
    )
    .pipe(
        first(),
        // backend model mapping
        map((response: any) => { // Response<AuthModel>
          const token = response.headers.get('Authorization');
          return token;
        }),
        shareReplay()
    );
  }

  retrieveGroupCodeList(searchKey: string) {
    return this.http.get<any>(
      `${this.globalVarialbe.remoteUrl}/${this.PRE_FIX}/groupCodeList?cmnGrpCd=${searchKey}`
    )
    .pipe(
      map((response: GroupCode[]) => {
        return response.map((groupCode: GroupCode) => groupCodeModelMapper(groupCode));
      })
    );
  }

  validateGroupCode(groupKey: string) {
    return this.http.get<any>(
      `${this.globalVarialbe.remoteUrl}/${this.PRE_FIX}/groupCode/valid/${groupKey}`
    )
    .pipe(
      map((response: any) => {
        console.log('validateGroupCode : ', response);
        return response;
      })
    );
  }

  insertGroupCode(param: GroupCodeParam) {
    return this.http.put<any>(
      `${this.globalVarialbe.remoteUrl}/${this.PRE_FIX}/groupCode`,
      param
    )
    .pipe(
      map((response: any) => {
        console.log('insertGroupCode : ', response);
        return response;
      })
    );
  }

  updateGroupCode(param: GroupCodeParam) {
    return this.http.put<any>(
      `${this.globalVarialbe.remoteUrl}/${this.PRE_FIX}/groupCode`,
      param
    )
    .pipe(
      map((response: any) => {
        console.log('updateGroupCode : ', response);
        return response;
      })
    );
  }

  deleteGroupCode(groupKey: string) {
    return this.http.put<any>(
      `${this.globalVarialbe.remoteUrl}/${this.PRE_FIX}/groupCode`,
      {
        cmnGrpCd: groupKey,
        type: 'delete'
      }
    )
    .pipe(
      map((response: any) => {
        console.log('deleteGroupCode : ', response);
        return response;
      })
    );
  }

  retrieveCodeListByGroup(groupKey: string) {
    return this.http.get<any>(
      `${this.globalVarialbe.remoteUrl}/${this.PRE_FIX}/codeList?cmnGrpCd=${groupKey}`
    )
    .pipe(
      map((response: Code[]) => {
        return response.map((code: Code) => codeModelMapper(code));
      })
    );
  }

  retrieveCommonCodeList(type: string = '') {
    return this.http.get<any>(
      `${this.globalVarialbe.remoteUrl}/${this.PRE_FIX}/codeList/${type}`
    )
    .pipe(
      map((response: CommonCode[]) => {
        this.globalVarialbe.commonCode[type] = response.map((code: CommonCode) => listCodeMapper(code));
        return this.globalVarialbe.commonCode[type];
      })
    );
  }
}
