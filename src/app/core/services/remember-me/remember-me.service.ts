import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RememberMeService {
  constructor(private cookieService: CookieService) {}

  set(name, value) {
    this.cookieService.set(
      name,
      JSON.stringify(value),
      new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
      '',
      location.host,
      true
    );
  }

  get(name) {
    const val = this.cookieService.get(name);
    if (val) {
      return JSON.parse(val);
    }
    return null;
  }

  remove(name) {
    this.cookieService.delete(name);
  }
}
