import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEmployeeComponent } from '../create-employee.component';
import { ListEmployeesComponent } from '../list-employees.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeRoutingModule } from '../employee-routing.module';
import { GlobalErrorHandlerService } from 'src/app/Services/global-error-handler.service';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [CreateEmployeeComponent,ListEmployeesComponent],
  imports: [
    CommonModule,ReactiveFormsModule,EmployeeRoutingModule,SharedModule
  ],
  providers : [GlobalErrorHandlerService]
})
export class EmployeemoduleModule { }
