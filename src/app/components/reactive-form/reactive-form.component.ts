import { Component, OnInit } from '@angular/core';
import { TitleComponent } from '../title/title.component';
import { StudentAmountFormComponent } from '../student-amount-form/student-amount-form.component';
import { IRegistrationData } from './interfaces/IRegisterationData';
import { AppService } from './reactive-form.service';

@Component({
  selector: 'app-reactive-form',
  imports: [TitleComponent, StudentAmountFormComponent],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.scss'
})

export class ReactiveFormComponent implements OnInit{
  
  data: IRegistrationData = {
    id: '',
    testDate: undefined,
    registerLastDate: undefined,
    phone: '',
    areas: [],
    attentionMessages: []
  }

  constructor(
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.appService.getRegistrationData().subscribe({
      next: response => {
        this.data = response;
        console.log("reactive-form-component",this.data);
      },
      error: err => {
        console.error('Error fetching registration data:', err);
      }
    });
  }

}