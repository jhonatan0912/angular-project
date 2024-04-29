import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { IDecodedToken } from '../models/decoded.interface';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('token');

  if (!token) next(req);

  const clonedRequest: HttpRequest<IDecodedToken> = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }) as HttpRequest<IDecodedToken>;

  return next(clonedRequest);
};
