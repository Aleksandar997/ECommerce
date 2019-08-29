import { Injectable } from '@angular/core';
import { HttpClientHelper } from '../common/http/HttpClientHelper';
import { LoginInfo } from '../models/loginInfo';
import { HttpHeaders } from '@angular/common/http';
import { LoginResponse } from '../models/loginResponse';
import { LocalData } from '../common/helpers/localData';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClientHelper) { }

  login(loginInfo: LoginInfo): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const data = new URLSearchParams();
    data.append('grant_type', 'password');
    data.append('username', loginInfo.username == null ? '' : loginInfo.username);
    data.append('password', loginInfo.password);
    data.append('cultureId', loginInfo.cultureId.toString());
    return this.httpClient.post('token', data.toString(), headers, null).then((res: LoginResponse) => {
      if (res && res.accessToken) {
        LocalData.setToken(res.accessToken);
        LocalData.setExpireToken(res.expiresIn * 1000);
        LocalData.setRefreshToken(res.refreshToken);
        return this.httpClient.get('user/getuser').then(userResponse => {
          LocalData.setUser(userResponse.data);
        });
      }
    });
  }
}
