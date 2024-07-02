import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {jwtDecode} from 'jwt-decode';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  let router = inject(Router);
  const token = localStorage.getItem('token');
  if (token) {
    let decodeToken = jwtDecode(token);
    const isExpired =
      decodeToken && decodeToken.exp
        ? decodeToken.exp < Date.now() / 1000
        : false;
    if (isExpired) {
      localStorage.removeItem('token');
      localStorage.removeItem('rol');
      router.navigateByUrl('/');
    } else {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }
  return next(req);
};
