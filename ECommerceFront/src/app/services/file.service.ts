import { Injectable } from '@angular/core';
import { ResponseBase } from '../common/models/responseBase';
import { HttpHeaders } from '@angular/common/http';
import { HttpClientHelper } from '../common/http/HttpClientHelper';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClient: HttpClientHelper) { }

  insertImage(file: any): Promise<ResponseBase<number>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // const data = new URLSearchParams();
    // data.append('file', file);
    return this.httpClient.post('file/image', file, new HttpHeaders());
  }
}
