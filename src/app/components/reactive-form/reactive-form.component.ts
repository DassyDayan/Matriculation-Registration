import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TitleComponent } from '../title/title.component';
import { StudentAmountFormComponent } from '../student-amount-form/student-amount-form.component';
import { AppService } from './reactive-form.service';
import { IMatriculation } from '../title/interfaces/IProps';
import { IModerator } from '../student-amount-form/interfaces';

@Component({
  selector: 'app-reactive-form',
  imports: [TitleComponent, StudentAmountFormComponent],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.scss'
})

export class ReactiveFormComponent implements OnInit {

  @Output() processCompleted: EventEmitter<{ success: boolean; email: string }> =
    new EventEmitter<{ success: boolean; email: string }>();

  selectedMatriculation: IMatriculation | undefined;
  moderatorsList: IModerator[] = [];

  constructor(private appService: AppService) { }

  ngOnInit(): void {
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
        } else {
          console.warn('Data missing required fields:', data);
        }
      },
      error: err => {
        console.error('Error getting latest matriculation data:', err);
      }
    });
  }

  private loadModeratorsDtoData() {
    this.appService.getTModeratorDTO().subscribe({
      next: (data: IModerator[]) => {
        this.moderatorsList = data;
      },
      error: (err) => console.error(err)
    });
  }

}