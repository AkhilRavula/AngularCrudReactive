import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { EmployeemoduleModule } from './employee/employeemodule/employeemodule.module';


import { employeeservice } from './employee/employee.service';

import { AppComponent } from './app.component';

import { HomeComponent } from './home.component';
import { PageNotFoundComponentComponent } from './page-not-found-component.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,
    ReactiveFormsModule,
    EmployeemoduleModule
  ],
  providers: [employeeservice],
  bootstrap: [AppComponent]
})
export class AppModule { }
