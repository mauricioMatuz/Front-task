import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Login } from '../../models/backend/Login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  Login(login: Login): Observable<Login> {
    console.log('Esto lega en login ', login);
    return this.http.post<Login>(`${this.url}/user/login`, login);
  }

  Pokemon() {
    return this.http.get(`${this.url}`);
  }
}
