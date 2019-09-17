import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, ResponseContentType, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  private downloadProfilelUrl = window['baseUrl'] + '/profile/download';
  private uploadProfilelUrl = window['baseUrl'] + '/profile/upload';

  constructor(public router: Router, private http: Http) {}

  uploadProfil (file, caller) {
    const uploadData = new FormData();
    uploadData.append('profileImage', file, file.name);
    const options = {
      headers: new Headers({
        'caller': caller
      }),
    };
    return this.http.post(this.uploadProfilelUrl, uploadData, options);
  }
}
