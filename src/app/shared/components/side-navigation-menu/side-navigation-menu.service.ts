import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { EndpointService } from '../../backend/api/endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class SideNavigationMenuService {
  private menuListSubject: Subject<any[]> = new Subject();

  constructor(
    private endpoint: EndpointService
  ) {

  }

  get $menuList(): Observable<any[]> {
    return this.menuListSubject.asObservable();
  }

  retrieveMenuList() {
    this.endpoint.retrieveMenuList().subscribe((result: any[]) => {
      this.menuListSubject.next(result);
    });
  }
}
