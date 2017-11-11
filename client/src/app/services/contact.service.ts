import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactService {

  options;
  domain = ""; // "http://localhost:8080/"; // Development Domain - Not Needed in Production

  constructor(
    private http: Http
  ) { }

  // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json' // Format set to JSON
      })
    })
  }

  sendEmail(emailInfo) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + 'contact',  emailInfo, this.options).map(res => res.json());
  }

}
