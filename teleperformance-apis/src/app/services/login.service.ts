import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, Response } from '../models/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  data: Login;
  token: string;
  readonly URL_API = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {
    this.data = new Login();
    this.token = "";
  }

  login(login: Login): Observable<Response> {
    return this.http.post<Response>(this.URL_API + '/login', login);
  }

  logout(): void {
    this.token = "";
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
  }

  saveToken(token: string, expiresIn: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token = token;
  }
  
}
