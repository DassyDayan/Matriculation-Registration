import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environment.prod';
import { IRegistrationData } from './interfaces/IRegisterationData';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  private apiUrl = `${environment.apiUrl}/api`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getRegistrationData(): Observable<IRegistrationData> {
    return this.http.get<IRegistrationData>(`${this.apiUrl}/Registration/GetRegistrationDetails`,
      this.httpOptions).pipe(
        catchError(error => {
          console.error('Error occurred:', error);
          return throwError(() => new Error('Something went wrong! Please try again later.'));
        }));
  }
}