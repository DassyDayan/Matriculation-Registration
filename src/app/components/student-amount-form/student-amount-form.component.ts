import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from "../popup/popup.component";
import { FormDataService } from "../student-amount-form/student-amount-form.component.service";
import { IArea, IFormDetails } from './interfaces';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-student-amount-form',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './student-amount-form.component.html',
  styleUrl: './student-amount-form.component.scss'
})

export class StudentAmountFormComponent {

  @ViewChild('registrationForm') registrationForm!: NgForm;
  @Input() areas: IArea[] | undefined;
  @Output() processCompleted: EventEmitter<boolean> = new EventEmitter<boolean>();

  formData: IFormDetails = {
    MorningExaminees: 10,
    NoonExaminees: 10
    ,
    Coordinator: {
      Name: "מנחם",
      Phone: "0548467857",
      Email: "dd@gmail.com"
    },
    Area: undefined,
    LabsCnt: 0,
    Examiners: []
  };

  pirchiMail: string = "pirchiatamar@gmail.com";
  numLabs: number = 0;
  examiners: number[] = [];

  private _laboratoriesAmount: number = 0;
  examinersNames: string[] = [];

  get laboratoriesAmount(): number {
    return this._laboratoriesAmount;
  }

  set laboratoriesAmount(value: number) {
    this._laboratoriesAmount = value;
    this.examinersNames = new Array(value).fill(undefined);
  }

  constructor(private dialog: MatDialog,
    private router: Router,
    private location: Location,
    private formDataService: FormDataService) { }

  onLabsChange(event: any) {
    let num = parseInt(event.target.value);
    if (num > 10) {
      num = 10;
    }
    if (!isNaN(num) && num > 0 && num <= 10) {
      this.formData.LabsCnt = num;
      this.examiners = Array(num).fill(0).map((_, i) => i + 1);
      this.formData.Examiners = new Array(num).fill(undefined);
    }
    else {
      this.formData.LabsCnt = 0;
      this.examiners = [];
      this.formData.Examiners = [];
    }
  }

  onSubmit() {
    if (this.registrationForm.form.valid && !this.isExceedingMaxExaminees()) {
      this.openPopup();
    } else {
      Object.keys(this.registrationForm.controls).forEach(key => {
        const control = this.registrationForm.controls[key];
        control.markAsTouched();
      });
    }
  }

  isExceedingMaxExaminees(): boolean {
    const totalExaminees = (this.formData.MorningExaminees ?? 0) + (this.formData.NoonExaminees ?? 0);
    const maxExamineesAllowed = (this.formData.LabsCnt ?? 0) * 20;
    return totalExaminees > maxExamineesAllowed;
  }

  openPopup(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      disableClose: true,
      autoFocus: false,
      data: {
        morningExaminees: this.formData.MorningExaminees,
        noonExaminees: this.formData.NoonExaminees,
        labRoomsAmount: this.formData.LabsCnt,
        divisionArea: this.formData.Area?.areaName
      }
    });


    dialogRef.afterClosed().pipe(
      delay(0)
    ).subscribe(result => {
      if (result === 'Confirm') {
        this.formDataService.sendFormData(this.formData).subscribe({
          next: response => {
            console.log('Response from server:', response);
            this.processCompleted.emit(true);
            setTimeout(() => {
              this.location.back();
            }, 5000);
          },
          error: err => console.error('Error occurred:', err),
        });
      }
    });
  }
}