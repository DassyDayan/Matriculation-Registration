import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TitleComponent } from './components/title/title.component';
import { StudentAmountFormComponent } from './components/student-amount-form/student-amount-form.component';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [ 
  ],
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
  providers: [    
  ],
  bootstrap: [
    // AppComponent,
    // ReactiveFormComponent,  
  ] 
})

export class AppModule { }
