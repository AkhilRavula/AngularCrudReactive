import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { PageNotFoundComponentComponent } from './page-not-found-component.component';
import { LoginEmployeeComponent } from './login-employee/login-employee.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [

  {path : 'Home' ,component : HomeComponent},
  // {path : 'List' , component : ListEmployeesComponent},
  // { path : 'Create' , component : CreateEmployeeComponent},
  // { path : 'edit/:id' , component : CreateEmployeeComponent},
  {path :'',redirectTo:'/Home' ,pathMatch: 'full'},
  {path:'Register' , component : LoginEmployeeComponent},
  {path : 'Login' , component:RegisterComponent},
  {path:'**' ,component:PageNotFoundComponentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
