import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuth } from '../models/auth.interface';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { IDecodedToken } from '../models/decoded.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiLoginUrl = 'http://localhost:3000/user/validate-user';

  constructor(private readonly httpRequest: HttpClient, private router: Router) {}

  validateAuth(credentials: IAuth): Observable<IAuth> {
    return this.httpRequest.post<IAuth>(this.apiLoginUrl, credentials);
  }

  saveTokenStorage(token: string) {
    sessionStorage.setItem('token', token);
  }

  getRolUser(): number | null {
    const token = sessionStorage.getItem('token') || '';

    const decodedToken: IDecodedToken = jwtDecode(token);
    const userRol = decodedToken.roles;

    return userRol;
  }

  redirectRol(roles: number) {
    switch (roles) {
      case 1:
        this.router.navigate(['/admin/dashboard/home']);
        break;
      case 2:
        this.router.navigate(['/storer/dashboard/home']);
        break;
      case 3:
        this.router.navigate(['/member/dashboard/home']);
        break;

      default:
        this.router.navigate(['/auth/login']);
        break;
    }
  }
}
