import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {Cm7710EndpointService} from '../../../backend/api/cm/cmn/cm7710-endpoint.service';
import {ListCode} from '../../../models/common-code';

@Injectable()
export class CommonCodeSelectBoxService {
    private codeListSubject: Subject<ListCode[]> = new Subject();

    constructor(
        private endpoint: Cm7710EndpointService
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
