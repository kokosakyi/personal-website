import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DownloadService {

  options;
  domain = ""; // "http://localhost:8080/"; // Development Domain - Not Needed in Production

  constructor(
    private http: Http
  ) { }

  // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/zip' // Format set to zip
      }),
      responseType: ResponseContentType.Blob
    });
  }

  // createAuthenticationHeadersForPdf() {
  //   this.options = new RequestOptions({
  //     headers: new Headers({
  //       'Content-Type': 'application/pdf' // Format set to zip
  //     }),
  //     responseType: ResponseContentType.Blob
  //   });
  // }

  downloadPFA() {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'download/pfa', this.options).map(res => res.blob());
  }

  downloadUndergradReport() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'download/undergradReport', this.options).map(res => res.blob());
  }

}
