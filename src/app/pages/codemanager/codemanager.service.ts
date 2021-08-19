import { Injectable } from '@angular/core';
import { EndpointService } from '../../shared/backend/api/endpoint.service';
import { Subject, Observable } from 'rxjs';
import { GroupCodeModel, CodeModel } from '../../shared/models/group-code-model';

@Injectable()
export class CodeManagerService {
  private groupCodeListSubject: Subject<GroupCodeModel[]> = new Subject();

  private codeListSubject: Subject<CodeModel[]> = new Subject();

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

  saveGroupCode() {

  }

  modifyGroupCode() {

  }

  deleteGroupCode() {

  }
}