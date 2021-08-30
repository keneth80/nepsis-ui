import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AppInjector} from '../services/app/app-injector.service';

@Component({
    selector: 'app-base',
    template: `NO UI TO BE FOUND HERE!`
})
export class BaseComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription;

    constructor() {
        // service lazy loading
        const injector = AppInjector.getInjector();
        if (injector) {

        }
        this.subscriptions = new Subscription();
    }

    set subscription(value: Subscription) {
        this.subscriptions.add(value);
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
