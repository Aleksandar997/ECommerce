import { Injectable } from '@angular/core';
import { HttpClientHelper } from '../common/http/HttpClientHelper';
import { ResponseBase } from '../common/models/responseBase';
import { DocumentStatus } from '../models/documentStatus';

@Injectable({
  providedIn: 'root'
})
export class DocumentStatusService {

  constructor(private httpClient: HttpClientHelper) { }

  selectAll(): Promise<ResponseBase<Array<DocumentStatus>>> {
    return this.httpClient.get('documentstatus/selectAll');
  }

}
