import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Cliente } from './cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';

// @Injectable({
//   providedIn: 'root'
// })

@Injectable()

export class ClienteService {

  private url: string = 'http://localhost:8080/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }
  
  /**
   * Get the clientes object Api backend*/
  getClientes(page: number): Observable<any>{
    //return this.http.get<Cliente[]>(this.url);
    return this.http.get(`${this.url}/page/${page}`).pipe(
      map((response: any) => {
        (response.content as Cliente[]).map(client => {
          client.nombre = client.nombre.toUpperCase();
          
          let datePipe = new DatePipe('es-CO')
          client.createAt = formatDate(client.createAt, 'yyyy-MM-dd', 'es-CO')
          return client;
        });
        return response;
      })
    );
  }
  getCliente(id: any): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.url}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.message);
        Swal.fire('Error al editar', e.error.message, 'error');
        return throwError(() => e);
      })
    )
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.url, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {

        if (e.status == 400){
          return throwError(() => e);         
        }
        console.error(e.error.message);
        Swal.fire('Error al crear', e.error.error, 'error');
        return throwError(() => e);
      })
    )
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.url}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if (e.status == 400){
          return throwError(() => e);         
        }
        console.error(e.error.message);
        Swal.fire(e.error.message? e.error.message : 'Error al editar', e.error.error, 'error')
        return throwError(() => e);
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.url}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.message);
        Swal.fire(e.error.message? e.error.message : 'Error al eliminar', e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }
}
