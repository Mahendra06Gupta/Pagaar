import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
    HttpInterceptor
  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { AuthService } from './../services/auth.service';
import { ErrorHandlerMessageService } from '@core/services/error-handler-message/error-handler-message.service';

@Injectable({
    providedIn: 'root'
  })
  export class ErrorInterceptor implements HttpInterceptor {
    constructor(
      private router: Router,
    //   private authService: AuthService,
      private errorHandlerMessageService: ErrorHandlerMessageService
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(
        catchError((response: any) => {
          if (response.status === 401) {
            this.errorHandlerMessageService.showToastForErrors(response);
            // this.authService.cleanup();
            this.router.navigate(['/login']);
            return throwError(response);
          } else if (response.status === 403) {
            console.log(response);
            this.errorHandlerMessageService.warn(response.error.message);
            // this.authService.cleanup();
            this.router.navigate(['/login']);
            return throwError(response);
          } else {
            this.errorHandlerMessageService.showToastForErrors(response);
            return throwError(response);
          }
        })
      );
    }
  }
