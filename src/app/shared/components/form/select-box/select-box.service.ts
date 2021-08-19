import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { EndpointService } from '../../../backend/api/endpoint.service';
import { ListCode } from '../../../models/common-code';

@Injectable()
export class SelectBoxService {
  private codeListSubject: Subject<ListCode[]> = new Subject();

  constructor(
    private endpoint: EndpointService
  ) {

  }

  get $codeList(): Observable<ListCode[]> {
    return this.codeListSubject.asObservable();
  }

  retrieveCommonCodeList(type: string) {
    this.endpoint.retrieveCommonCodeList(type).subscribe((result: ListCode[]) => {
      this.codeListSubject.next(result);
    });
  }
}
