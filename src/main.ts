/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
// import { AttentionListComponent } from './app/components/reactive-form/attention-list.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


//
// bootstrapApplication(AttentionListComponent, {
//   providers: [
//     importProvidersFrom(BrowserAnimationsModule)
//   ]
// }).catch(err => console.error(err));
