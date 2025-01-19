import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component'; 
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TitleComponent } from './components/title/title.component';
import { StudentAmountFormComponent } from './components/student-amount-form/student-amount-form.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent, 
    ReactiveFormComponent,
    StudentAmountFormComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, FormsModule,MatDialogModule ,
    BrowserAnimationsModule   ,TitleComponent,CommonModule,HttpClientModule 
  ],
  providers: [    
    provideHttpClient(withInterceptorsFromDi()), 
    provideHttpClient() 
  ],
  bootstrap: [AppComponent,
    ReactiveFormComponent,  
  ] 
})

export class AppModule { }
