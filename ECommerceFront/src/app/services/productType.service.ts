import { Injectable } from '@angular/core';
import { HttpClientHelper } from '../common/http/HttpClientHelper';
import { ResponseBase } from '../common/models/responseBase';
import { ProductType } from '../models/productType';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {

  constructor(private httpClient: HttpClientHelper) { }

  selectAll(): Promise<ResponseBase<Array<ProductType>>> {
    return this.httpClient.get('producttype/selectAll');
  }

  saveChanges(productTypes: Array<ProductType>): Promise<ResponseBase<Array<ProductType>>> {
    return this.httpClient.post('producttype/saveChanges', productTypes);
  }
}
