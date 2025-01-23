import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from './environment.prod';
import { IArea } from './components/student-amount-form/student-amount-form.interfaces';
import { IRegistrationData } from './components/reactive-form/interfaces/IRegisterationData';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  private apiUrl =`${environment.apiUrl}/api`;

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

  getTestDate(): Observable<Date> {
    return this.http.get<Date>(`${this.apiUrl}/test-date`);
  }

  getRegisterLastDate(): Observable<Date> {
    return this.http.get<Date>(`${this.apiUrl}/register-last-date`);
  }

  getPhone(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/contact-phone`);
  }

  getAttentionArray(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/attention-messages`);
  }

  getAreas(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/areas`);
  }

  updateRegistrationData(data: Partial<IRegistrationData>): Observable<IRegistrationData> {
    return this.http.patch<IRegistrationData>(`${this.apiUrl}/registration-data`, data);
  }
}