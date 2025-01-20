import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment.prod';
import { catchError, Observable, pipe, throwError } from 'rxjs';
import { IFormDetails } from './student-amount-form.interfaces';

@Injectable({
  providedIn: 'root'
})

export class FormDataService {

  private apiUrl = `${environment.apiUrl}/AddInstitution`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  sendFormData(data: IFormDetails): Observable<any> {

    const mappedData = {
      Id: null, // או כל ערך אחר שנדרש
      MorningExaminees: data.MorningExaminees || 0,
      NoonExaminees: data.NoonExaminees || 0,
      LabsCnt: data.LabsCnt || 0,
      AreaId: data.Area?.id,
      Area: data.Area ? {
        Id: data.Area.id,
        AreaName: data.Area.areaName
      } : null,
      CoordinatorId: null, // יתמלא בשרת
      Coordinator: data.Coordinator ? {
        Id: null, // יתמלא בשרת
        Name: data.Coordinator.Name,
        Phone: data.Coordinator.Phone,
        Email: data.Coordinator.Email
      } : null,
      Examiners: data.Examiners
        .filter(name => name) // סינון ערכים ריקים
        .map(name => ({
          Id: null, // יתמלא בשרת
          Name: name
        }))
    };

    return this.http.post(this.apiUrl, mappedData, this.httpOptions);
    //   .pipe(
    //   catchError(error => {
    //     console.error('Error occurred:', error);
    //     return throwError(() => new Error('Something went wrong! Please try again later.'));
    //   })
    // );
  }

}