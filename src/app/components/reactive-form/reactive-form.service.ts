import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environment.prod';
import { IMatriculation } from '../title/interfaces/IProps';
import { IModerator } from '../student-amount-form/interfaces';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  private apiUrl = `${environment.apiUrl}`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getLatestData(): Observable<IMatriculation> {
    return this.http.get<IMatriculation>(`${this.apiUrl}/latest`, this.httpOptions).pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error('Something went wrong! Please try again later.'));
      })
    );
  }

  getTModeratorDTO(): Observable<IModerator[]> {
    return this.http.get<IModerator[]>(`${this.apiUrl}/GetModerators`, this.httpOptions).pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => new Error('Something went wrong! Please try again later.'));
      })
    );
  }
}