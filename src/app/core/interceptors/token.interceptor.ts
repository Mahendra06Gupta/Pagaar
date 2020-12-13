import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

// import { AuthService } from './../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const authInfo = this.authService.getAuthInfo();
    // if (authInfo) {
    //   request = request.clone({
    //     setHeaders: {
    //       Authorization: authInfo.jwt
    //     }
    //   });
    // }
    return next.handle(request);
  }
}
