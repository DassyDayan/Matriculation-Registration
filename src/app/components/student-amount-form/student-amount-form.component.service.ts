import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environment.prod';
import { IUpdateMatriculationDataRequest } from './interfaces';

@Injectable({
  providedIn: 'root'
})

export class FormDataService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  sendFormData(data: IUpdateMatriculationDataRequest, username: string,
    password: string): Observable<any> {

    const url = `${environment.apiUrl}/update?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

    return this.http.post(url, data, this.httpOptions)
      .pipe(
        catchError(error => {
          console.error('Error occurred:', error);
          return throwError(() => new Error('Error Sending From Data! Please try again later.'));
        })
      );
  }

}