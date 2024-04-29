import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';
import { AuthService } from '../services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const errorService = inject(ErrorService);

  const token = sessionStorage.getItem('token');

  if (!token) router.navigate(['/auth/login']);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        const messageError = `${error.error.message}`;
        errorService.reportError(messageError);
        sessionStorage.clear();
        router.navigate(['/auth/login']);
      } else {
        const menssageError = `Error message: ${error.message}`;
        menssageError;
      }
      return throwError(() => new Error());
    }),
  );
};
