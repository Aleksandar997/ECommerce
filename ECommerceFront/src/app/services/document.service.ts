import { Injectable } from '@angular/core';
import { HttpClientHelper } from '../common/http/HttpClientHelper';
import { ResponseBase } from '../common/models/responseBase';
import { Document } from '../models/document';
import { BasePaging } from '../models/paging/basePaging';
import { PagingHelper } from '../common/helpers/pagingHelper';
import { DocumentDetail } from '../models/documentDetail';
import { DetailPaging } from '../models/paging/detailPaging';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private httpClient: HttpClientHelper) { }

  postObject(document: Document): Promise<ResponseBase<number>> {
    return this.httpClient.post('document/postobject', document);
  }

  selectAll(paging: BasePaging): Promise<ResponseBase<Array<Document>>> {
    const url = 'document/selectall?' + PagingHelper.ToUrlQueryParam(paging);
    return this.httpClient.get(url);
  }

  detailsSelectAllByDocument(paging: DetailPaging): Promise<ResponseBase<Array<DocumentDetail>>> {
    const url = 'document/selectdocumentdetails?' + PagingHelper.ToUrlQueryParam(paging);
    return this.httpClient.get(url);
  }

  selectByDocumentId(paging: DetailPaging): Promise<ResponseBase<Document>> {
    const url = 'document/selectbydocumentid?' + PagingHelper.ToUrlQueryParam(paging);
    return this.httpClient.get(url);
  }
}
