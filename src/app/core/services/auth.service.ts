import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { IAuth } from '../models/auth.interface';
import { IDecodedToken } from '../models/decoded.interface';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiLoginUrl = `${environment.API_URL}/user/validate-user`;

  constructor(private readonly httpRequest: HttpClient, private router: Router) { }

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
