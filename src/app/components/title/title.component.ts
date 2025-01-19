import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {toJewishDate,} from "jewish-date";
import { gematriya } from '@hebcal/core';

export interface IProps{
  testDate:Date|undefined;
  registerLastDate:Date|undefined;
  phone:string|undefined;
  Attention:string[];
}

@Component({
  selector: 'app-title',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})

export class TitleComponent{

  @Input() testDate: Date | undefined;
  @Input() registerLastDate: Date | undefined;
  @Input() phone: string | undefined;
  @Input() Attention: string[] = [];

  currentYear: string;

  constructor() {
    this.currentYear = gematriya(toJewishDate(new Date()).year);
  }

}