import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeeComponent } from './create-employee.component';
import { ListEmployeesComponent } from './list-employees.component';


const routes: Routes = [

{path : 'employees' ,children:[
  {path : 'List' , component : ListEmployeesComponent},
  { path : 'Create' , component : CreateEmployeeComponent},
  { path : 'edit/:id' , component : CreateEmployeeComponent}
]}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }