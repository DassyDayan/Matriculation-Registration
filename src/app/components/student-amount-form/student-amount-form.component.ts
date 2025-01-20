import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PopupComponent } from "../popup/popup.component"
import { MatDialog } from '@angular/material/dialog';

export interface IFormDetails {
  examineesAmount: {
    morning: number | undefined;
    noon: number | undefined;
  };
  coordinateDetails: {
    name: string | undefined;
    phone: string | undefined;
    mail: string | undefined;
  };
  materialReceivingArea: string | undefined;
  labsAmount: number | undefined;
  examinersNames: (string | undefined)[];
}

@Component({
  selector: 'app-student-amount-form',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './student-amount-form.component.html',
  styleUrl: './student-amount-form.component.scss'
})

export class StudentAmountFormComponent {
  @ViewChild('registrationForm') registrationForm!: NgForm;

  @Input() areas: string[] | undefined;

  formData: IFormDetails = {
    examineesAmount: {
      morning: undefined,
      noon: undefined
    },
    coordinateDetails: {
      name: undefined,
      phone: undefined,
      mail: undefined
    },
    materialReceivingArea: undefined,
    labsAmount: undefined,
    examinersNames: []
  };

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

  constructor(private dialog: MatDialog) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['areas'] && changes['areas'].currentValue) {
      this.handleAreasChange();
    }
  }

  private handleAreasChange() {
    if (this.areas && this.areas.length > 0) {
      const messagesOnly = this.areas.map((item: any) => item.areaName);
      this.areas = messagesOnly;
    }
  }

  onLabsChange(event: any) {
    const num = parseInt(event.target.value);
    this.formData.labsAmount = num;
    this.examiners = Array(num).fill(0).map((_, i) => i + 1);
    this.formData.examinersNames = new Array(num).fill(undefined);
  }

  onSubmit() {
    if (this.registrationForm.form.valid) {
      this.openPopup();
      // this.formDataService.sendFormData(this.formData).subscribe(response => {
      //   console.log('Response from server:', response);
      // });
    } else {
      Object.keys(this.registrationForm.controls).forEach(key => {
        const control = this.registrationForm.controls[key];
        control.markAsTouched();
      });
    }
  }

  openPopup(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: {
        totalExamineeStudents: (this.formData.examineesAmount.morning ?? 0) +
          (this.formData.examineesAmount.noon ?? 0),
        labRoomsAmount: this.formData.labsAmount,
        divisionArea: this.formData.materialReceivingArea
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}