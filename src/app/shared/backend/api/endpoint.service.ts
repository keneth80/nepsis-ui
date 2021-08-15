import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, concatMap, first, shareReplay } from 'rxjs/operators';
import { GlobalVariableService } from '../../services/app/global-variable.service';
import { UserModel } from '../../models/user-model';

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
      { observe: 'response' }
    )
    .pipe(
        first(),
        // backend model mapping
        map((request: any) => { // Response<AuthModel>
          console.log('request : ', request);
          // TODO: token setting
          // const data: AuthModel = AuthMapper.authModelMapper(request);
          // if (data && data.access_token) {
          //     return data;
          // } else {
          //     return throwError('no permission!');
          // }
          return {
            userName: userId,
            token: request.token,
          } as UserModel
        }),
        // frontend model mapping
        // map(AuthMapper.userModelMapper),
        shareReplay()
    );
  }

  retrieveGroupCodeList(searchKey: string) {
    return this.http.get<any>(
      `${this.globalVarialbe.remoteUrl}/${this.PRE_FIX}/groupCodeList?cmnGrpCd=${searchKey}`
    );
  }

  retrieveCodeListByGroup(groupKey: string) {
    return this.http.get<any>(
      `${this.globalVarialbe.remoteUrl}/${this.PRE_FIX}/codeList?cmnGrpCd=${groupKey}`
    );
  }
}
