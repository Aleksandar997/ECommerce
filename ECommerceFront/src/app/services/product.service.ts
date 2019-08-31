import { Injectable } from '@angular/core';
import { HttpClientHelper } from '../common/http/HttpClientHelper';
import { ResponseBase } from '../common/models/responseBase';
import { Product } from '../models/product';
import { HttpHeaders } from '@angular/common/http';
import { UploadFileInfo } from '../models/uploadFileInfo';
import { BasePaging } from '../models/paging/basePaging';
import { PagingHelper } from '../common/helpers/pagingHelper';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClientHelper) { }

  insertProduct(product: Product): Promise<ResponseBase<number>> {
    const formData = product.images ? product.getFormData() : new FormData();
    return this.httpClient.post('file/image', formData, new HttpHeaders()).then((res: ResponseBase<Array<UploadFileInfo>>) => {
      product.addImageNames(res.data);
      return this.httpClient.post('product/insertProduct', product);
    });
  }

  ProductSelectAll(paging: BasePaging): Promise<ResponseBase<Array<Product>>> {
    const url = 'product/selectAll?' + PagingHelper.ToUrlQueryParam(paging);
    return this.httpClient.get(url);
  }

  ProductSelectSingle(productId: number): Promise<ResponseBase<Product>> {
    return this.httpClient.get('product/selectSingle/' + productId);
  }

  ProductDelete(intList: Array<number>, paging: BasePaging): Promise<ResponseBase<Array<Product>>> {
    let url = 'product/delete?';
    intList.forEach(p => url += 'value=' + p + '&');
    url += PagingHelper.ToUrlQueryParam(paging);
    return this.httpClient.delete(url);
  }
  selectAllByFilter(paging: BasePaging): Promise<ResponseBase<Array<Product>>> {
    const url = 'product/selectAllByFilter?' + PagingHelper.ToUrlQueryParam(paging);
    return this.httpClient.get(url);
  }
}
