import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

// import { AuthService } from './../services/auth.service';
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

// import { Injectable, OnDestroy } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// import { Observable, Subscription } from 'rxjs';
// import { Store } from '@ngrx/store';

// import { RootState } from '@app/store';
// import { getLoggedUSerToken } from '@app/store/user-details/user-details.selectors';
// import { tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class TokenInterceptor implements HttpInterceptor, OnDestroy {

//   public handleRequest: HttpRequest<any>;
//   public subscriptionArray: Subscription[] = [];

//   constructor(
//     public readonly store$: Store<RootState>
//   ) {}

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     console.log(this.store$.select(getLoggedUSerToken));
//     this.subscriptionArray.push(this.store$.select(getLoggedUSerToken).pipe(
//       tap((token) => {
//         if (token) {
//           this.handleRequest = request.clone({
//             setHeaders: {
//               Authorization: token
//             }
//           });
//         }
//       })
//     ).subscribe());
//     if (this.handleRequest) {return next.handle(this.handleRequest); }
//   }

//   public ngOnDestroy(): void {
//     if (this.subscriptionArray && this.subscriptionArray.length > 0) {
//       this.subscriptionArray.forEach((subscription: Subscription) => subscription.unsubscribe());
//     }
//   }
// }
