import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { StudentAmountFormComponent } from './components/student-amount-form/student-amount-form.component';
import { TitleComponent } from './components/title/title.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule, 
    ReactiveFormsModule, 
    FormsModule,
    MatDialogModule ,
    BrowserAnimationsModule,
    TitleComponent,
    CommonModule,
    RouterModule.forRoot([]),
    ReactiveFormComponent,
    StudentAmountFormComponent
  ],
  providers: [],
  bootstrap: [] 
})

export class AppModule { }
