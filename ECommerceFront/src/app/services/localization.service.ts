import { Injectable } from '@angular/core';
import { HttpClientHelper } from '../common/http/HttpClientHelper';
import { Culture } from '../common/models/culture';
import { ResponseBase } from '../common/models/responseBase';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  constructor(private httpClient: HttpClientHelper) { }

  getTranslates(): Promise<ResponseBase<Array<Culture>>> {
    return this.httpClient.get('localization');
  }
}
