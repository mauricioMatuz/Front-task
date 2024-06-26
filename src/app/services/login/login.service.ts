import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Login } from '../../models/backend/Login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url =
    'https://pokeapi.co/api/v2/https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
  constructor(private http: HttpClient) {}

  Login(login: Login): Observable<Login> {
    console.log('Esto lega en login ', login);
    return this.http.post<Login>(`${this.url}/login`, login);
  }

  Pokemon() {
    return this.http.get(`${this.url}`);
  }
}
