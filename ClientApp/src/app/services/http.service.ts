import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  async get(path) {
    return await this.http.get(this.baseUrl + path).toPromise();
  }

  async post(path, data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return await this.http.post(this.baseUrl + path, data, httpOptions).toPromise();
  }
}
