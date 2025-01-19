import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private apiUrl = 'http://localhost:3000/api/form-data';

  constructor(private http: HttpClient) {}

  sendFormData(data: any) {
    return this.http.post(this.apiUrl, data);
  }
}
