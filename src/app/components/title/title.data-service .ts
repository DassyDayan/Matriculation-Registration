import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ServerResponse {
  registerLastDate: string;
  phone: string;
  Attention: string[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/api/form-data'; // כתובת השרת

  constructor(private http: HttpClient) {}

  getFormData(): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.apiUrl);
  }
}
