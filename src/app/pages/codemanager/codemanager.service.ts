import { Injectable } from '@angular/core';
import { EndpointService } from '../../shared/backend/api/endpoint.service';
import { Subject, Observable } from 'rxjs';
import { GroupCodeModel, CodeModel } from '../../shared/models/group-code-model';
import { ListCode } from '../../shared/models/common-code';
import { GroupCodeParam } from '../../shared/backend/params/group-code-param';

@Injectable()
export class CodeManagerService {
  private groupCodeListSubject: Subject<GroupCodeModel[]> = new Subject();

  private codeListSubject: Subject<CodeModel[]> = new Subject();

  private jobCodeListSubject: Subject<ListCode[]> = new Subject();

  private validateGroupCodeSubject: Subject<boolean> = new Subject();

  private successSubject: Subject<string> = new Subject();

  constructor(
    private endpoint: EndpointService
  ) {

  }

  get $groupCodeList(): Observable<GroupCodeModel[]> {
    return this.groupCodeListSubject.asObservable();
  }

  get $codeListByGroupCode(): Observable<CodeModel[]> {
    return this.codeListSubject.asObservable();
  }

  get $jobCodeList(): Observable<ListCode[]> {
    return this.jobCodeListSubject.asObservable();
  }

  get $validateGroupCode(): Observable<boolean> {
    return this.validateGroupCodeSubject.asObservable();
  }

  get $success(): Observable<string> {
    return this.successSubject.asObservable()
  }

  retrieveGroupCodeList(cmnGrpCd: string) {
    this.endpoint.retrieveGroupCodeList(cmnGrpCd).subscribe((result: GroupCodeModel[]) => {
      this.groupCodeListSubject.next(result);
    });
  }

  retrieveCodeListByGroupCode(cmnGrpCd: string) {
    this.endpoint.retrieveCodeListByGroup(cmnGrpCd).subscribe((result: CodeModel[]) => {
      this.codeListSubject.next(result);
    });
  }

  retrieveJobCodeList(type: string) {
    this.endpoint.retrieveCommonCodeList(type).subscribe((result: ListCode[]) => {
      this.jobCodeListSubject.next(result);
    });
  }

  validateGroupCode(cmnGrpCd: string) {
    this.endpoint.validateGroupCode(cmnGrpCd).subscribe((result: boolean) => {
      this.validateGroupCodeSubject.next(result);
    })
  }

  insertGroupCode(groupCodeParam: GroupCodeParam) {
    this.endpoint.insertGroupCode(groupCodeParam).subscribe((result: any) => {
      console.log('insertGroupCode.result : ', result);
      this.successSubject.next('insert');
    });
  }

  updateGroupCode(groupCodeParam: GroupCodeParam) {
    this.endpoint.updateGroupCode(groupCodeParam).subscribe((result: any) => {
      console.log('updateGroupCode.result : ', result);
      this.successSubject.next('update');
    });
  }

  deleteGroupCode(cmnGrpCd: string) {
    this.endpoint.deleteGroupCode(cmnGrpCd).subscribe((result: any) => {
      console.log('deleteGroupCode.result : ', result);
      this.successSubject.next('delete');
    });
  }

  validationGroupParam(param: GroupCodeParam) {
    let errorMessage = '';
    if (!param.cmnGrpCd || param.cmnGrpCd.trim() === '') {
      errorMessage = 'Group Code를 입력해주세요.';
    } else if (!param.jobStCd || param.jobStCd.trim() === '') {
      errorMessage = 'Job Code를 입력해주세요.';
    } else if (!param.useYn || param.useYn.trim() === '') {
      errorMessage = 'Use Y/N을 선택해주세요.';
    } else if (!param.codeList.length) {
      errorMessage = '하위 code를 등록해주세요.';
    } else {
      for (const codeParam of param.codeList) {
        if (!codeParam.cmnCd) {
          errorMessage = '하위 code를 입력해주세요.';
        } else if (!codeParam.useYn) {
          errorMessage = '하위 code 선택여부를 선택해주세요.';
        }

        if (errorMessage !== '') {
          break;
        }
      }
    }

    return errorMessage;
  }

  isChangeValue(groupCode: GroupCodeModel, groupForm: GroupCodeParam) {
    console.log('isChangeValue : ', groupCode, groupForm);
    let result = false;
    if (
      groupCode.code !== groupForm.cmnGrpCd ||
      groupCode.codeName !== groupForm.cmnGrpCdNm ||
      groupCode.codeDescription !== groupForm.cdDesc ||
      groupCode.jobCode !== groupForm.jobStCd ||
      groupCode.useYn !== groupForm.useYn
    ) {
      result = true;
    }

    return result;
  }
}