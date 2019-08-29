import { Injectable } from '@angular/core';
import { HttpClientHelper } from '../common/http/HttpClientHelper';
import { ResponseBase } from '../common/models/responseBase';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClientHelper) { }

  selectAll(): Promise<ResponseBase<Array<Customer>>> {
    return this.httpClient.get('customer/selectAll');
  }
}
