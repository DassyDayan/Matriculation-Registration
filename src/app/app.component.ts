import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './components/title/title.component';
import { StudentAmountFormComponent } from './components/student-amount-form/student-amount-form.component';
import { AppService } from './app.service';
import { catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataService } from './service/data-service ';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    TitleComponent,
    StudentAmountFormComponent,RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'Matriculation-Registration';

  testDate: Date = new Date();
  registerLastDate: Date = new Date();
  phone: string = "054-600-3413";
  attentionArray: string[] = [
    "ניתן להרשם לבחינת הבגרות עד התאריך",
    'בית ספר שלא יעשה רישום עד תאריך זה לא יקבל חומרים',
    "ההרשמה הינה חובה גם במידה ואינכם מעוניינים בקבלת החומרים",
    'הרישום בפיקוח משרד החינוך',
    "שימו לב, בכל בעיה ברישום לבחינה, יש לפנות בווצאפ בלבד במספר טלפון 054-600-3413"
  ];
  areas:string[]= ["דרום", "צפון", "מרכז", "ירושלים"]
  data: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData().subscribe(response => {
      this.data = response;
    });
  }
}
  // private defaultData = {
  //   title: 'Matriculation-Registration',
  //   testDate: new Date(),
  //   registerLastDate: new Date(),
  //   phone: "054-600-3413",
  //   attentionArray: [
  //     `ניתן להרשם לבחינת הבגרות עד התאריך ${new Date().toLocaleDateString()}`,
  //     '.בית ספר שלא יעשה רישום עד תאריך זה לא יקבל חומרים',
  //     ".ההרשמה הינה חובה גם במידה ואינכם מעוניינים בקבלת החומרים",
  //     '.הרישום בפיקוח משרד החינוך',
  //     `שימו לב, בכל בעיה ברישום לבחינה, יש לפנות בווצאפ בלבד במספר טלפון 054-600-3413`
  //   ],
  //   areas: ["דרום", "צפון", "מרכז", "ירושלים"]
  // };

  // title = this.defaultData.title;
  // testDate: Date = this.defaultData.testDate;
  // registerLastDate: Date = this.defaultData.registerLastDate;
  // phone: string = this.defaultData.phone;
  // attentionArray: string[] = this.defaultData.attentionArray;
  // areas: string[] = this.defaultData.areas;

  // constructor(private appService: AppService) {
  //   this.loadRegistrationData();
  // }

  // loadRegistrationData() {
  //   this.appService.getRegistrationData()
  //     .pipe(
  //       catchError(error => {
  //         console.error('Error fetching registration data:', error);
  //         return of(this.defaultData);
  //       })
  //     )
  //     .subscribe({
  //       next: (data) => {
  //         this.title = data.title || this.defaultData.title;
  //         this.testDate = new Date(data.testDate) || this.defaultData.testDate;
  //         this.registerLastDate = new Date(data.registerLastDate) || this.defaultData.registerLastDate;
  //         this.phone = data.phone || this.defaultData.phone;
  //         this.attentionArray = data.attentionArray || this.defaultData.attentionArray;
  //         this.areas = data.areas || this.defaultData.areas;
  //       },
  //       complete: () => {
  //         console.log('Request completed');
  //       }
  //     });
  // }
