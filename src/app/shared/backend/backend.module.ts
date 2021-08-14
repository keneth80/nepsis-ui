import { NgModule } from '@angular/core';
// import { fakeBackendProvider } from './interceptor/fake-backend.interceptor';
import { EndpointService } from './api/endpoint.service';



@NgModule({
    providers: [
        // fakeBackendProvider,
        // FeedApiService
    ]
})
export class BackendModule { }
