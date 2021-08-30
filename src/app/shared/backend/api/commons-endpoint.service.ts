import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {first, map, shareReplay} from 'rxjs/operators';

import {BaseEndpointService} from "../../services/base-endpoint.service";

@Injectable({providedIn: 'root'})
export class CommonsEndpointService extends BaseEndpointService {

    constructor(
        private http: HttpClient
    ) {
        super('');
    }

    login(userId: string, password: string) {
        return this.http.post<any>(
            `${this.root}/login`,
            {username: userId, password},
            {withCredentials: true, observe: 'response'}
        )
        .pipe(
            first(),
            map((response: any) => response.headers.get('Authorization')),
            shareReplay()
        );
    }
}
