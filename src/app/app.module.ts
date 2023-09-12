import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { EmployeemoduleModule } from './employee/employeemodule/employeemodule.module';


import { employeeservice } from './employee/employee.service';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home.component';
import { PageNotFoundComponentComponent } from './page-not-found-component.component';
import { LoginEmployeeComponent } from './login-employee/login-employee.component';
import { RegisterComponent } from './register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthServiceService } from './auth-service.service';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponentComponent,
    LoginEmployeeComponent,
    RegisterComponent
   ],
  imports: [
    BrowserModule, EmployeemoduleModule,
    AppRoutingModule,HttpClientModule,
    ReactiveFormsModule,BrowserAnimationsModule ,ToastrModule.forRoot(), CarouselModule.forRoot()

  ],
  providers: [employeeservice,AuthServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
