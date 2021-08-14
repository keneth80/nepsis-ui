import { Observable, Observer } from 'rxjs';
import { delay } from 'rxjs/operators';

export const delayExcute = (delayTime: number = 100, callback: any) => {
    return new Observable((observ: Observer<boolean>) => {
        observ.next(true);
        observ.complete();
    })
    .pipe(
        delay(delayTime)
    ).subscribe(() => {
        callback();
    });
};
