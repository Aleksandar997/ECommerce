import { Injectable } from '@angular/core';
import { HttpClientHelper } from '../common/http/HttpClientHelper';
import { ResponseBase } from '../common/models/responseBase';
import { Vat } from '../models/vat';

@Injectable({
  providedIn: 'root'
})
export class VatService {

  constructor(private httpClient: HttpClientHelper) { }

  selectAll(): Promise<ResponseBase<Array<Vat>>> {
    return this.httpClient.get('vat/selectAll');
  }
}
