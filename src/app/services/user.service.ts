import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  async signIn(email: string, password: string) {
    return this.http.post<{ accessToken: string }>('http://localhost:8080/auth/signin', {
      email: email,
      password: password
    }).toPromise();
  }
}
