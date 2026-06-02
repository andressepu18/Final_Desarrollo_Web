import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resenia } from '../models/resenia';

@Injectable({
  providedIn: 'root',
})
export class ReseniaService {

  private apiUrl = 'http://localhost:1702/api/resenia';
  
  constructor(private http : HttpClient){}

  obtenerResenas() : Observable<Resenia[]>{
    return this.http.get<Resenia[]>(this.apiUrl+"s");
  }

  obtenerReseniaPorId(id: string): Observable<Resenia> {
    return this.http.get<Resenia>(this.apiUrl + "/" + id);
  }

  private crearHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return token ? new HttpHeaders({
      'Authorization': 'Bearer ' + token
    }) : new HttpHeaders();
  }

  crearResenia(resenia: Resenia): Observable<any> {
    const headers = this.crearHeaders();
    return this.http.post<any>(this.apiUrl, resenia, { headers: headers });
  }

  actualizarResenia(id: string, resenia: Resenia): Observable<any> {
    const headers = this.crearHeaders();
    return this.http.put<any>(this.apiUrl + "/" + id, resenia, { headers: headers });
  }

  eliminarResenia(id: string): Observable<void> {
    const headers = this.crearHeaders();
    return this.http.delete<void>(this.apiUrl + "/" + id, { headers: headers });
  }
  
}
