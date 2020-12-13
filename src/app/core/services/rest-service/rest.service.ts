import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable()
export class RestService {
  constructor(private httpClient: HttpClient) {}

  get(url): Observable<any> {
    return this.httpClient.get(url);
  }

  post(url: string, body: any | null, options: any = {}) {
    return this.httpClient.post(url, body);
  }

  put(url: string, body: any | null, options: any = {}) {
    return this.httpClient.put(url, body);
  }

  delete(url: string, options: any = {}) {
    return this.httpClient.delete(url, options);
  }
}
