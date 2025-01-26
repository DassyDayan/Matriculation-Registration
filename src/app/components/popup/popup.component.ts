import { Component, Input } from '@angular/core';
import { PopupService } from './popup.service';
import { CommonModule } from '@angular/common';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { toJewishDate, } from "jewish-date";
import { gematriya } from '@hebcal/core';
import { Iprops } from './interfaces';

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
    private popupService: PopupService,
    @Inject(MAT_DIALOG_DATA) public data: Iprops
  ) {
    this.props = data;
    this.registrationDetails = {
      year: new Date(new Date().getFullYear(), 0, 1),
      morningExaminees: this.props.morningExaminees,
      noonExaminees: this.props.noonExaminees,
      labRoomsAmount: this.props.labRoomsAmount,
      divisionArea: this.props.divisionArea,
      finalDate: new Date("2025-12-31")//server get
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
  }

}