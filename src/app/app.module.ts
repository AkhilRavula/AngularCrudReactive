import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateEmployeeComponent } from './employee/create-employee.component';
import { ListEmployeesComponent } from './employee/list-employees.component';
import { employeeservice } from './employee/employee.service';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    CreateEmployeeComponent,
    ListEmployeesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [employeeservice],
  bootstrap: [AppComponent]
})
export class AppModule { }
