import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeeComponent } from './create-employee.component';
import { ListEmployeesComponent } from './list-employees.component';
import { CreateEmployeeResolver } from './employeemodule/create-employee-resolver.service';
import { AuthGuardService } from '../AuthGuard.service';
import { canDeactiveRoute } from './employeemodule/candeactive-employee';


const routes: Routes = [

{path : 'employees' ,children:[
  {path : 'List' , component : ListEmployeesComponent,canActivate : [AuthGuardService]},
  { path : 'Create' , component : CreateEmployeeComponent,canActivate : [AuthGuardService],canDeactivate :[canDeactiveRoute]},
  { path : 'edit/:id' , component : CreateEmployeeComponent ,canActivate : [AuthGuardService],
   resolve : {empresol : CreateEmployeeResolver},canDeactivate :[canDeactiveRoute]}
]}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
