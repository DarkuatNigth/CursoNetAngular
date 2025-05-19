import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(objReq: HttpRequest<any>, objNext: HttpHandler){
    const objTokenSeguridad = localStorage.getItem('token');
    if (!objTokenSeguridad) {
      return objNext.handle(objReq);
    }
    const objRequest = objReq.clone({
      headers: objReq.headers.set('Authorization', `Bearer ${objTokenSeguridad}`)
    });
    return objNext.handle(objRequest);
  }
}
