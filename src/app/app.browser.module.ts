import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiKeyInterceptor } from './api-key-interceptor';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

import { ReactiveFormsModule } from '@angular/forms';
import { AppModule } from './app.module';

@NgModule({
  imports: [
    
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppModule,
    BrowserTransferStateModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }
