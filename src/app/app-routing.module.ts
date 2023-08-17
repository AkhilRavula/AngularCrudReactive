import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeeComponent } from './employee/create-employee.component';
import { ListEmployeesComponent } from './employee/list-employees.component';
import { HomeComponent } from './home.component';
import { PageNotFoundComponentComponent } from './page-not-found-component.component';

const routes: Routes = [

  {path : 'Home' ,component : HomeComponent},
  {path : 'List' , component : ListEmployeesComponent},
  { path : 'Create' , component : CreateEmployeeComponent},
  { path : 'edit/:id' , component : CreateEmployeeComponent},
  {path :'',redirectTo:'/Home' ,pathMatch: 'full'},
  {path:'**' ,component:PageNotFoundComponentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
