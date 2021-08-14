import { Injectable, Injector } from '@angular/core';
import { AppInjector } from './app-injector.service';

/**
 * @description application load 전에 하고자 하는 작업을 정의
 */
@Injectable({
  providedIn: 'root'
})
export class ApplicationInitializeService {
  constructor(
      private injector: Injector
  ){ }

  load(): Promise<any> {
      AppInjector.setInjector(this.injector);
      return new Promise(((resolve) => resolve(true)));
  }
}
