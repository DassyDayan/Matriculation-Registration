import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { DataService } from './service/data.service';
import { AppService } from './components/reactive-form/reactive-form.service';
import { IMatriculation } from './components/title/interfaces/IProps';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent implements OnInit {

  title = 'Matriculation-Registration';
  data: any;

  registerLastDate: Date | undefined;
  openRegisterationDate: Date | undefined;
  dateNow: Date | undefined;
  processCompleted: boolean = false;
  coordinatorEmail: string = '';

  constructor(private dataService: DataService, private appService: AppService
    , private location: Location,

  ) { }

  ngOnInit(): void {

    this.dateNow = new Date();
    this.openRegisterationDate = new Date('2025-01-01');
    this.registerLastDate = new Date('2025-08-01');

    this.dataService.getData().subscribe({
      next: response => {
        this.data = response;
        console.log("Data:\t", this.data);
      },
      error: err => {
        console.error('Error fetching data:', err);
      }
    })

    this.loadLatestMatriculationData();
  }

  isRegistrationOpen(): boolean {
    return this.dateNow && this.openRegisterationDate && this.registerLastDate
      ? this.dateNow >= this.openRegisterationDate && this.dateNow <= this.registerLastDate
      : false;
  }

  isRegistrationClosed(): boolean {
    return this.dateNow && this.registerLastDate
      ? this.dateNow > this.registerLastDate
      : false;
  }

  isRegistrationNotOpened(): boolean {
    return this.dateNow && this.openRegisterationDate
      ? this.dateNow < this.openRegisterationDate
      : false;
  }

  onProcessCompleted(event: { success: boolean; email: string }): void {
    this.processCompleted = event.success;
    this.coordinatorEmail = event.email;
    setTimeout(() => this.location.back(), 5000);
  }

  private loadLatestMatriculationData() {
    // this.appService.getLatestData().subscribe({
    //   next: (data: IMatriculation) => {
    //     if (data) {
    //       this.registerLastDate = new Date(data.dtStudentsLastUpdateDate);
    //       this.openRegisterationDate = new Date(this.registerLastDate);
    //       this.openRegisterationDate.setMonth(this.openRegisterationDate.getMonth() - 2);
    //     } else {
    //       console.warn('Data missing required fields:', data);
    //     }
    //   },
    //   error: err => {
    //     console.error('Error getting latest matriculation data:', err);
    //   }
    // });
    console.log('change dates from server');
    
  }
}

// https://bagrut.biu-edulab.org.il/?nvUserName=BAAEF&nvPassword=635D9