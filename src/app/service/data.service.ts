import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../environment.prod';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private apiUrl = `${environment.apiUrl}/api/ConnectionTest/test`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(this.apiUrl, this.httpOptions).pipe(
      catchError((error: any) => {
        console.error('Error occurred:', error);
        return throwError(() => new Error('Something went wrong! Please try again later.'));
      })
    );
  }
}