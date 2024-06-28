import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/backend/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private headers: HttpHeaders;
  private url = `http://localhost:3000`;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.checkToken();
  }
  private checkToken(): void {
    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local (o de donde lo hayas guardado)
    if (token) {
      this.setAuthorizationHeader(token);
    }
  }
  private setAuthorizationHeader(token: string): void {
    this.headers = this.headers.set('Authorization', `Bearer ${token}`);
  }

  LisUser(): Observable<any> {
    return this.http.get<User[]>(`${this.url}/user`, { headers: this.headers });
  }
}
