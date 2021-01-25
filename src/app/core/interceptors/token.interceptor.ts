import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from '@app/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private readonly authService: AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authInfo = this.authService.getAuthInfo();
    if (authInfo) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authInfo}`
        }
      });
    }
    return next.handle(request);
  }
}
