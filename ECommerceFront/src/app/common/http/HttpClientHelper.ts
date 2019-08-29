import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class HttpClientHelper {
    headers: HttpHeaders;
    apiurl = 'https://localhost:5001/api/';

    constructor(private http: HttpClient) {
    }

    private setDefaultHeader() {
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            // tslint:disable-next-line:object-literal-key-quotes
            'Accept': 'application/json',
            // 'Accept-Language': LocalData.getCultureName(),
            // tslint:disable-next-line:object-literal-key-quotes
            // 'Authorization': LocalData.getToken(),
            'Cache-Control': 'no-cache',
            // 'Pragma': 'no-cache',
            // 'Expires': '0'
        });
    }

    get(url: string, headers: HttpHeaders = null, httpParams: HttpParams = null, noCheckToken = false): any {
        if (headers) {
            this.headers = headers;
        } else {
            this.setDefaultHeader();
        }
        return this.http.get(this.apiurl + url, { headers: this.headers, withCredentials: true, params: httpParams }).toPromise()

            .catch((err) => { throw err.error; });

    }

    post(url: string, data: any, headers: HttpHeaders = null, noCheckToken = false, httpParams: HttpParams = null): any {
        if (headers) {
            this.headers = headers;
        } else {
            this.setDefaultHeader();
        }
        return this.http.post(this.apiurl + url, data, { headers: this.headers, params: httpParams, withCredentials: true }).toPromise()
            .catch((err) => { throw err.error; });
    }

    put(url: string, data: any, headers: HttpHeaders, httpParams: HttpParams = null): any {
        if (headers) {
            this.headers = headers;
        } else {
            this.setDefaultHeader();
        }
        return this.http.put(this.apiurl + url, data, { headers: this.headers, withCredentials: true, params: httpParams }).toPromise()

            .catch((err) => { throw err.error; });
    }

    delete(url: string, headers: HttpHeaders = null, httpParams: HttpParams = null): any {
        if (headers) {
            this.headers = headers;
        } else {
            this.setDefaultHeader();
        }
        return this.http.delete(this.apiurl + url, { headers: this.headers, withCredentials: true, params: httpParams }).toPromise()

            .catch((err) => { throw err.error; });
    }
}
