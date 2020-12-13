import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class ErrorHandlerMessageService {

  constructor(private toastr: ToastrService) {}

  public showToastForErrors(err: any): void {
    console.log(err.error);
    let errorMessage;
    switch (err.status) {
      case 412:
        errorMessage = err.error.errors[0].error[0].message;
        break;
      case 403:
        errorMessage = err.error;
        break;
      case 401:
        if (err.error.error === 'Unauthorized') {
          errorMessage = 'Session Expired';
        } else {
          errorMessage = err.error;
        }
        break;
      case 500:
        errorMessage = err.error.message;
        break;
      default:
        if (err.error.errors === 'Invalid email' || err.error.errors === 'Incorrect password' ) {
          errorMessage = 'Invalid email or password';
        } else {
          errorMessage = err.error.errors;
        }
        break;
    }
    if (errorMessage) {
      this.error(errorMessage);
    }
  }

  public error(msg: string): void {
    this.toastr.error(msg);
  }

  public info(msg: string): void {
    this.toastr.success(msg);
  }

  public warn(msg: string): void {
    this.toastr.warning(msg);
  }
}
