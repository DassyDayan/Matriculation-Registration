import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TitleComponent } from '../title/title.component';
import { StudentAmountFormComponent } from '../student-amount-form/student-amount-form.component';
import { AppService } from './reactive-form.service';
import { IMatriculation } from '../title/interfaces/IProps';
import { IModerator } from '../student-amount-form/interfaces';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-reactive-form',
  imports: [CommonModule, TitleComponent, StudentAmountFormComponent],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.scss'
})

export class ReactiveFormComponent implements OnInit {

  @Output() processCompleted: EventEmitter<{ success: boolean; email: string }> =
    new EventEmitter<{ success: boolean; email: string }>();
  hasError: boolean = false;
  selectedMatriculation: IMatriculation | undefined;
  moderatorsList: IModerator[] = [];
  isLoading: boolean = true;
  private errorTimeoutId: any;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.errorTimeoutId = setTimeout(() => {
      if (this.isLoading) {
        this.isLoading = true;
        this.hasError = false;
      }
    }, 8000);
    this.loadLatestMatriculationData();
    this.loadModeratorsDtoData();
  }

  onProcessCompleted(event: { success: boolean; email: string }): void {
    this.processCompleted.emit(event);
  }


  private loadLatestMatriculationData() {
    this.appService.getLatestData().subscribe({
      next: (data: IMatriculation) => {
        if (data && data.iMatriculationId != null && data.nvMatriculationName != null) {
          this.selectedMatriculation = {
            ...data,
            dtMatriculationDate: new Date(data.dtMatriculationDate),
            dtStudentsLastUpdateDate: new Date(data.dtStudentsLastUpdateDate)
          };
          this.clearLoadingState();
        } else {
          console.warn('Data missing required fields:', data);
          this.setErrorState();
        }
      },
      error: err => {
        console.error('Error getting latest matriculation data:', err);
        this.setErrorState();
      }
    });
  }

  private loadModeratorsDtoData() {
    this.appService.getTModeratorDTO().subscribe({
      next: (data: IModerator[]) => {
        this.moderatorsList = data;
      },
      error: (err) => {
        console.error(err);
        this.setErrorState();
      }
    });
  }

  private clearLoadingState() {
    this.isLoading = false;
    clearTimeout(this.errorTimeoutId);
  }

  private setErrorState() {
    clearTimeout(this.errorTimeoutId);
    this.hasError = true;
    this.isLoading = false;
  }
}