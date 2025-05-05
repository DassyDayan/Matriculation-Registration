import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from "../popup/popup.component";
import { Location } from '@angular/common';
import { delay } from 'rxjs/operators';
import { IMatriculationFormViewModel, IModerator, IUpdateMatriculationDataRequest } from './interfaces';
import { FormDataService } from "../student-amount-form/student-amount-form.component.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-amount-form',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './student-amount-form.component.html',
  styleUrl: './student-amount-form.component.scss'
})

export class StudentAmountFormComponent {

  @ViewChild('registrationForm') registrationForm!: NgForm;
  @Output() processCompleted: EventEmitter<{ success: boolean; email: string }> =
    new EventEmitter<{ success: boolean; email: string }>();
  @Input() moderators: IModerator[] = [];
  @Input() dtStudentsLastUpdateDate: Date | undefined;

  updateRequest: IMatriculationFormViewModel = {
    MorningTesters: 10,
    EveningTesters: 10,
    Moderator: undefined,
    CoordinatorName: "מנחם",
    CoordinatorEmail: "dd@gmail.com",
    CoordinatorPhone: "0548467857",
    LaboratoryRooms: 0,
    AccompanyingTeachers: []
  };

  pirchiMail: string = "pirchiatamar@gmail.com";
  numLabs: number = 0;
  examiners: number[] = [];

  username: string = '';
  password: string = '';

  constructor(private dialog: MatDialog,
    private formDataService: FormDataService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'] || 'A1F1D';
      this.password = params['password'] || 'B9DE7';
    });
  }

  onLabsChange(event: any) {
    let num = parseInt(event.target.value);
    if (num > 10) {
      num = 10;
    }
    if (!isNaN(num) && num > 0 && num <= 10) {
      this.updateRequest.LaboratoryRooms = num;
      this.examiners = Array(num).fill(0).map((_, i) => i + 1);
      this.updateRequest.AccompanyingTeachers = new Array(num).fill(undefined);
    }
    else {
      this.updateRequest.LaboratoryRooms = 0;
      this.examiners = [];
      this.updateRequest.AccompanyingTeachers = [];
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
    const totalExaminees = (this.updateRequest.MorningTesters ?? 0) + (this.updateRequest.EveningTesters ?? 0);
    const maxExamineesAllowed = (this.updateRequest.LaboratoryRooms ?? 0) * 20;
    return totalExaminees > maxExamineesAllowed;
  }

  openPopup(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      disableClose: true,
      autoFocus: false,
      data: {
        morningExaminees: this.updateRequest.MorningTesters,
        noonExaminees: this.updateRequest.EveningTesters,
        labRoomsAmount: this.updateRequest.LaboratoryRooms,
        divisionArea: this.updateRequest.Moderator!.nvFirstName + " " +
          this.updateRequest.Moderator!.nvLastName + " " +
          this.updateRequest.Moderator!.nvRegion,
        finalDate: this.dtStudentsLastUpdateDate
      }
    });

    dialogRef.afterClosed().pipe(
      delay(0)
    ).subscribe(result => {
      if (result === 'Confirm') {
        const payload: IUpdateMatriculationDataRequest = {
          MorningTesters: this.updateRequest.MorningTesters,
          EveningTesters: this.updateRequest.EveningTesters,
          ModeratorId: this.updateRequest.Moderator?.iModeratorId ?? 0,
          CoordinatorName: this.updateRequest.CoordinatorName,
          CoordinatorEmail: this.updateRequest.CoordinatorEmail,
          CoordinatorPhone: this.updateRequest.CoordinatorPhone,
          LaboratoryRooms: this.updateRequest.LaboratoryRooms,
          AccompanyingTeachers: this.updateRequest.AccompanyingTeachers
        };

        this.formDataService.sendFormData(payload, this.username, this.password).subscribe({
          next: (response: any) => {
            this.processCompleted.emit({
              success: true,
              email: this.updateRequest.CoordinatorEmail
            });
            setTimeout(() => this.location.back(), 5000);
          },
          error: err => console.error('Error occurred:', err),
        });
      }
    });
  }
}