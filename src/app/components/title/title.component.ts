import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { toJewishDate, } from "jewish-date";
import { gematriya } from '@hebcal/core';
import { IMatriculation } from './interfaces/IProps';

@Component({
  selector: 'app-title',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})

export class TitleComponent implements OnInit {

  @Input() matriculationData: IMatriculation | undefined;

  currentYear: string | undefined;
  latestData: any;
  error: string | null = null;

  constructor() {
    // this.currentYear = gematriya(toJewishDate(new Date()).year);    
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['matriculationData']) {
      // console.log('Matriculation data changed:', this.matriculationData);
    }
  }
  

  ngOnInit() {    
  }
}