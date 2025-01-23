import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent implements OnInit {

  title = 'Matriculation-Registration';
  data: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe({
      next: response => {
        this.data = response;
        console.log("Data:\t", this.data);
      },
      error: err => {
        console.error('Error fetching data:', err);
      }
    })
  }
  
}