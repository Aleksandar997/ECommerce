import { Injectable } from '@angular/core';
import { HttpClientHelper } from '../common/http/HttpClientHelper';
import { ResponseBase } from '../common/models/responseBase';
import { Document } from '../models/document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private httpClient: HttpClientHelper) { }

  postObject(document: Document): Promise<ResponseBase<number>> {
    return this.httpClient.post('document/postobject', document);
  }

  selectAll(): Promise<ResponseBase<number>> {
    return this.httpClient.get('document/selectall');
  }
}
