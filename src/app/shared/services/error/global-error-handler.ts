import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
// import { NotificationService } from '../../services/notification/notification.service';


// Global Error 관리 handler
@Injectable({
    providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
      // private notificationService: NotificationService
  ) {
  }

  handleError(error: Error | HttpErrorResponse): void {
    let errorMessage: any;
    if (error instanceof HttpErrorResponse) {
        // Server error
        if (!navigator.onLine) {
            // No Internet connection
            errorMessage = 'Please check your internet connection';
        } else {
            // Http Error
            errorMessage = error.message;
        }
        console.log('Http Error => ', errorMessage);
    } else {
        // Script Error
        errorMessage = error.message || error;
    }

    console.log('error : ', error);

      // TODO: notify
      // this.notificationService.notifyMessage(errorMessage);
  }
}
