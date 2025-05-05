import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { DataService } from './service/data.service';

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

  constructor(private dataService: DataService) { }

  ngOnInit(): void {

    //אמור להתקבל מהסרבר
    this.dateNow = new Date();
    this.openRegisterationDate = new Date('2025-01-01');
    this.registerLastDate = new Date('2025-05-08');

    this.dataService.getData().subscribe({
      next: response => {
        this.data = response;
        // console.log("Data:\t", this.data);
      },
      error: err => {
        console.error('Error fetching data:', err);
      }
    })
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
  }

}

// https://bagrut.biu-edulab.org.il/?nvUserName=BAAEF&nvPassword=635D9