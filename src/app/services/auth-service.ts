import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {jwtDecode} from 'jwt-decode';
import {JwtPayload} from '../models/jwt-payload-model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;
  roles: string | undefined = "";
  username: string | undefined = "";
  accessToken: string = "";

  constructor(private http: HttpClient, private router: Router) {
  }

  public login(username: string, password: string) {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }
    const body = {
      "username": username,
      "password": password
    }

    return this.http.post("http://localhost:8085/auth/login", body, options)
  }

  public loadProfile(data: any) {
    this.accessToken = data["access_token"];
    this.isAuthenticated = true;
    const tokenDecoded = jwtDecode<JwtPayload>(this.accessToken);
    this.username = tokenDecoded.sub;
    this.roles = tokenDecoded.scope;
    window.localStorage.setItem("access-token", this.accessToken);
  }


  public loadToken() {
    const token = window.localStorage.getItem("access-token");
    if (token) {
      this.router.navigateByUrl("/");
    }
  }
}
