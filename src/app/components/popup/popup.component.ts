import { CommonModule } from '@angular/common';
import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { gematriya } from '@hebcal/core';
import { toJewishDate, } from "jewish-date";
import { Iprops, IRegistrationDetails } from './interfaces';

@Component({
  selector: 'app-popup',
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
  standalone: true
})

export class PopupComponent {

  registrationDetails: {
    year: Date;
    morningExaminees: number | undefined;
    noonExaminees: number | undefined;
    labRoomsAmount: number | undefined;
    divisionArea: string | undefined;
    finalDate: Date;
  };

  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) data: Partial<IRegistrationDetails>
  ) {
    this.registrationDetails = {
      year: new Date(new Date().getFullYear(), 0, 1),
      morningExaminees: data.morningExaminees ?? 0,
      noonExaminees: data.noonExaminees ?? 0,
      labRoomsAmount: data.labRoomsAmount ?? 0,
      divisionArea: data.divisionArea ?? '',
      finalDate: new Date("2025-12-31")//מהסרבר
    };
  }

  @Input() props: Iprops = {
    labRoomsAmount: undefined,
    divisionArea: undefined,
    morningExaminees: undefined,
    noonExaminees: undefined
  }

  get registrationYear(): string {
    return gematriya(toJewishDate(new Date()).year);
  }

  onEdit(): void {
    this.dialogRef.close('edit');
  }

  onConfirm(): void {
    this.dialogRef.close('Confirm');
  }
}