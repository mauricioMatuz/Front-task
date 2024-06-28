import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { Login } from '../../models/backend/Login';
import { environment } from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';
export interface JwtPayload {
  sub: number;
  name: string;
  rol: string;
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private url = `http://localhost:3000`;
  constructor(private http: HttpClient) {}

  Login(login: Login): Observable<Login> {
    console.log('Esto lega en login ', login);
    return this.http.post<Login>(`${this.url}/user/login`, login).pipe(
      map((response: any) => {
        console.log(response);
        if (response != null) {
          const token = response.access_token;
          const decodedToken = jwtDecode<JwtPayload>(token);
          localStorage.setItem('token', token);
          localStorage.setItem('rol', decodedToken.rol);
          return response;
        }
        return null;
      })
    );
  }
}
