import { Component, Input } from '@angular/core';
import { PopupService } from './popup.service';
import { CommonModule } from '@angular/common';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {toJewishDate,} from "jewish-date";
import { gematriya } from '@hebcal/core';

export interface IRegistrationDetails {
  year: Date;
  totalExamineeStudents: number|undefined;
  labRoomsAmount: number|undefined;
  divisionArea: string|undefined;
  finalDate: Date;
}

interface Iprops {
  totalExamineeStudents: number |undefined;
  labRoomsAmount: number |undefined;
  divisionArea: string | undefined;
}

@Component({
  selector: 'app-popup',
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
  standalone:true
})

export class PopupComponent {
  registrationDetails: {
    year: Date; 
    totalExamineeStudents: number | undefined; 
    labRoomsAmount: number | undefined; 
    divisionArea: string | undefined; 
    finalDate: Date;
  };

  constructor(
    private popupService: PopupService,
    @Inject(MAT_DIALOG_DATA) public data: Iprops
  ) {
    this.props = data;    
    this.registrationDetails = {
      year: new Date(new Date().getFullYear(), 0, 1),
      totalExamineeStudents: this.props.totalExamineeStudents,
      labRoomsAmount: this.props.labRoomsAmount,
      divisionArea: this.props.divisionArea,
      finalDate: new Date("2025-12-31")//server get
    };
  }

  @Input() props: Iprops = {
    totalExamineeStudents: undefined,
    labRoomsAmount: undefined,
    divisionArea: undefined
  }

  get registrationYear(): string {
    return gematriya(toJewishDate(new Date()).year);
    // return this.registrationDetails.year.getFullYear();
  }

  openPopup() {
    this.popupService.openPopup();
  }

  closeDialog() {
    this.popupService.closePopup();
  }
  onEdit(): void {
    this.closeDialog();
  }

  onConfirm(): void {
    // const emailContent = {
    //   subject: 'Registration Details for Matriculation Exam',
    //   body: `
    //     Year: ${this.registrationDetails.year.getFullYear()}
    //     Total Students: ${this.registrationDetails.totalExamineeStudents}
    //     Lab Rooms: ${this.registrationDetails.labRoomsAmount}
    //     Division Area: ${this.registrationDetails.divisionArea}
    //     Final Update Date: ${this.registrationDetails.finalDate.toLocaleDateString()}
    //   `,
    //   to: 'dassydayn@gmail.com' 
    // };

    // this.http.post('/api/send-email', emailContent).subscribe(
    //   (response) => {
    //     console.log('Email sent successfully:', response);
    //   },
    //   (error: Error) => {
    //     console.error('Error sending email:', error);
    //   }
    // );
  }

}