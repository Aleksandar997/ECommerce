import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { LocalData } from '../helpers/localData';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req, next) {
    const tokenizedRed = req.clone({
      setHeaders: {
        Authorization: `Bearer ${LocalData.getToken()}`
      }
    });
    return next.handle(tokenizedRed);
  }
}
