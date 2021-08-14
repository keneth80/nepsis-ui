import { Subscription } from 'rxjs';
import { AppInjector } from './app/app-injector.service';

export class BaseService {
    private subscriptions: Subscription;

    constructor() {
        const injector = AppInjector.getInjector();
        if (injector) {
            // TODO: get server
        }
        this.subscriptions = new Subscription();
    }

    set subscription(value: Subscription) {
        this.subscriptions.add(value);
    }

    destoryed() {
        this.subscriptions.unsubscribe();
    }
}
