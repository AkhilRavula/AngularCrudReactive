import { Component } from '@angular/core';
import { employeeservice } from './employee.service';
import { Iemployee } from './IEMPLOYEE';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent {

  employees! : Iemployee[]

  constructor(private _employeeservice : employeeservice,private _router : Router)
  {

  }

   ngOnInit()
   {
      this._employeeservice.GetEmployees().subscribe(
        {
          next:(listemp)=>this.employees=listemp,
        error:(err) => console.log(err)
      }
      )
   }

   EditEmployee(employeeid : number)
   {
    this._router.navigate(["/edit",employeeid]);
   }
}
