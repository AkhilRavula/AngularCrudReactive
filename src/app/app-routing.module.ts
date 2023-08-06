import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeeComponent } from './employee/create-employee.component';
import { ListEmployeesComponent } from './employee/list-employees.component';

const routes: Routes = [

  {path : 'List' , component : ListEmployeesComponent},
  { path : 'Create' , component : CreateEmployeeComponent},
  {path :'',redirectTo:'/List' ,pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
