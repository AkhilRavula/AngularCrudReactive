import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEmployeeComponent } from '../create-employee.component';
import { ListEmployeesComponent } from '../list-employees.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeRoutingModule } from '../employee-routing.module';


@NgModule({
  declarations: [CreateEmployeeComponent,ListEmployeesComponent],
  imports: [
    CommonModule,ReactiveFormsModule,EmployeeRoutingModule
  ],
  providers : []
})
export class EmployeemoduleModule { }
