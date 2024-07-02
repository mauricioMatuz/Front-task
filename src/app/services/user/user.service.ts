import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/backend/User';
import { Observable } from 'rxjs';
import { UserRegister } from '../../models/backend';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // private headers: HttpHeaders;
  private url = `http://localhost:3000`;

  constructor(private http: HttpClient) {}

  LisUser(): Observable<any> {
    return this.http.get<User[]>(`${this.url}/user`);
  }
  ListRol(): Observable<any> {
    return this.http.get(`${this.url}/rol`);
  }
  RegisterUser(user: UserRegister): Observable<any> {
    return this.http.post(`${this.url}/user`, user);
  }
}
