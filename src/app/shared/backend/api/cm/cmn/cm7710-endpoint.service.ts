import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {GlobalVariableService} from '../../../../services/app/global-variable.service';
import {Code, CommonCode, GroupCode} from '../../../models/group-code';
import {codeModelMapper, groupCodeModelMapper, listCodeMapper} from '../../../../mappers';
import {GroupCodeParam} from '../../../params/group-code-param';
import {BaseEndpointService} from "../../../../services/base-endpoint.service";

@Injectable({providedIn: 'root'})
export class Cm7710EndpointService extends BaseEndpointService {

  constructor(
      private http: HttpClient,
      private globalVarialbe: GlobalVariableService
  ) {
    super('cm7710');
  }

  retrieveGroupCodeList(searchKey: string) {
    return this.http.get<any>(
        `${this.prefix}/groupCodeList?cmnGrpCd=${searchKey}`
    )
    .pipe(
        map((response: GroupCode[]) => response.map((groupCode: GroupCode) => groupCodeModelMapper(groupCode)))
    );
  }

  validateGroupCode(groupKey: string) {
    return this.http.get<any>(
        `${this.prefix}/groupCode/valid/${groupKey}`
    )
    .pipe(
        map((response: any) => response)
    );
  }

  insertGroupCode(param: GroupCodeParam) {
    return this.http.put<any>(
        `${this.prefix}/groupCode`,
        param
    )
    .pipe(
        map((response: any) => response)
    );
  }

  updateGroupCode(param: GroupCodeParam) {
    return this.http.put<any>(
        `${this.prefix}/groupCode`,
        param
    )
    .pipe(
        map((response: any) => response)
    );
  }

  deleteGroupCode(groupKey: string) {
    return this.http.put<any>(
        `${this.prefix}/groupCode`,
        {
          cmnGrpCd: groupKey,
          type: 'delete'
        }
    )
    .pipe(
        map((response: any) => response)
    );
  }

  retrieveCodeListByGroup(groupKey: string) {
    return this.http.get<any>(
        `${this.prefix}/codeList?cmnGrpCd=${groupKey}`
    )
    .pipe(
        // map((response: Code[]) => response.map((code: Code) => codeModelMapper(code)))
        map((response: any) => response.map((code: any) => {
          code.isServer = true;
          return code;
        }))
    );
  }

  retrieveCommonCodeList(type: string = '') {
    return this.http.get<any>(
        `${this.prefix}/codeList/${type}`
    )
    .pipe(
        map((response: any) => {
          // this.globalVarialbe.commonCode[type] = response.map((code: CommonCode) => listCodeMapper(code));
          this.globalVarialbe.commonCode[type] = response;
          return this.globalVarialbe.commonCode[type];
        })
    );
  }
}
