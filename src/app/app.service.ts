import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegistrationData {
  title: string;
  testDate: Date;
  registerLastDate: Date;
  phone: string;
  attentionArray: string[];
  areas: string[];
}

@Injectable({
  providedIn: 'root'
})

export class AppService {
  private apiUrl = process.env["apiUrl"]|| ''; 

  constructor(private http: HttpClient) {    
    console.log("apiUrl",this.apiUrl);
  }

  getRegistrationData(): Observable<RegistrationData> {
    return this.http.get<RegistrationData>(`${this.apiUrl}/registration-data`);
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

  updateRegistrationData(data: Partial<RegistrationData>): Observable<RegistrationData> {
    return this.http.patch<RegistrationData>(`${this.apiUrl}/registration-data`, data);
  }
}