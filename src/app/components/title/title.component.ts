import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { toJewishDate, } from "jewish-date";
import { gematriya } from '@hebcal/core';
import moment from 'moment';

@Component({
  selector: 'app-title',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})

export class TitleComponent {

  @Input() testDate: Date | undefined;
  @Input() registerLastDate: Date | undefined;
  @Input() phone: string | undefined;
  @Input() Attention: string[] = [];

  currentYear: string;

  constructor() {
    this.currentYear = gematriya(toJewishDate(new Date()).year);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['Attention'] && changes['Attention'].currentValue) {
      this.handleAttentionChange();
    }
  }

  private handleAttentionChange() {
    if (this.Attention && this.Attention.length > 0) {
      const messagesOnly = this.Attention.map((item: any) => item.message);
      this.Attention = messagesOnly;
    }  
    this.Attention[0]+=` ${moment(this.registerLastDate).format('DD/MM/YYYY')}`;    
  }

}