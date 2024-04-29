import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IVerifyEmail } from '../models/verifyEmail.interface';
import { Observable, throwError } from 'rxjs';
import { IUpdatePassword } from '../models/updatePassword.interface';
import { IDecodedToken } from '../models/decoded.interface';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly VerifyAccountUrl = 'http://localhost:3000/user/verify-email';
  private readonly RecoverPasswordUrl = 'http://localhost:3000/user/recover-password';
  private readonly GetProfilePersonUrl = 'http://localhost:3000/user';

  constructor(private readonly httpRequestClient: HttpClient) {}

  verifyEmail(form: IVerifyEmail) {
    return this.httpRequestClient.post(`${this.VerifyAccountUrl}`, form);
  }

  recoverPassword(uid: string, token: string, form: IUpdatePassword) {
    const url = `${this.RecoverPasswordUrl}/${uid}/${token}`;
    return this.httpRequestClient.patch(url, form);
  }

  getProfile() {
    const token = sessionStorage.getItem('token');

    if (!token) {
      return throwError(() => new Error('Toke no fue encontrado.'));
    }

    const decodedToken: IDecodedToken = jwtDecode(token);
    const uid = decodedToken.uid;

    return this.httpRequestClient.get(`${this.GetProfilePersonUrl}/${uid}`);
  }
}
