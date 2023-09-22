import { NgModule, isDevMode } from '@angular/core';
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
import { NotFoundErrorComponent } from './ErrrorComponent/NotFoundError/NotFoundError.component';
import { InternalServerErrorComponent } from './ErrrorComponent/InternalServerError/InternalServerError.component';
import { GlobalErrorHandlerService } from './Services/global-error-handler.service';
import { SharedModule } from './shared/shared.module';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponentComponent,
    LoginEmployeeComponent,
    RegisterComponent,NotFoundErrorComponent,InternalServerErrorComponent
   ],
  imports: [
    BrowserModule, EmployeemoduleModule,SharedModule,
    AppRoutingModule,HttpClientModule,
    ReactiveFormsModule,BrowserAnimationsModule ,ToastrModule.forRoot(), CarouselModule.forRoot(), ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})

  ],
  providers: [employeeservice,AuthServiceService,GlobalErrorHandlerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
