import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AppService } from './app.service';
import { StudentAmountFormComponent } from './components/student-amount-form/student-amount-form.component';
import { TitleComponent } from './components/title/title.component';
import { IRegistrationData } from './interfaces/IRegisterationData';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule,
    TitleComponent,
    StudentAmountFormComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent implements OnInit {

  title = 'Matriculation-Registration';

  data: IRegistrationData = {
    id: '',
    testDate: undefined,
    registerLastDate: undefined,
    phone: '',
    areas: [],
    attentionMessages: []
  }

  constructor(
    // private dataService: DataService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    // this.dataService.getData().subscribe({
    //   next: response => {
    //     this.data = response;
    //     console.log("Data:\t", this.data);
    //   },
    //   error: err => {
    //     // console.error('Error fetching data:', err);
    //   }
    // })

    this.appService.getRegistrationData().subscribe({
      next: response => {
        this.data=response;
        console.log(this.data);         
      },
      error: err => {
        console.error('Error fetching registration data:', err);
      }
    });
  }
}