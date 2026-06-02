import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface LoginResponse{
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private apiUrl = 'http://localhost:1702/api/usuario/login';

  constructor(private http : HttpClient){}

  login(email : string, password: string) : Observable<LoginResponse>{
    let body = {
      email: email,
      password: password
    }

    return this.http.post<LoginResponse>(this.apiUrl, body);
  }

  guardarToken(token: string) : void {
    sessionStorage.setItem('token', token);
  }

  obtenerToken() : string | null {
    return sessionStorage.getItem("token");
  }

  estaLogueado() : boolean{
    let token = this.obtenerToken();

    if (token){
      return true;
    }
    else{
      return false;
    }
  }

  cerrarSesion() : void{
    sessionStorage.removeItem("token");
  }

}
