import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environment.prod';
import { IUpdateMatriculationDataRequest } from './interfaces';

@Injectable({
  providedIn: 'root'
})

export class FormDataService {

  private apiUrl = `${environment.apiUrl}/update?username=A1F1D&password=B9DE7`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  sendFormData(data: IUpdateMatriculationDataRequest): Observable<any> {

    return this.http.post(this.apiUrl, data, this.httpOptions)
      .pipe(
        catchError(error => {
          console.error('Error occurred:', error);
          return throwError(() => new Error('Error Sending From Data! Please try again later.'));
        })
      );
  }

}