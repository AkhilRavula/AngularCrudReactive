import { Component, OnInit } from '@angular/core';
import { employeeservice } from './employee.service';
import { Iemployee } from './IEMPLOYEE';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalErrorHandlerService } from '../Services/global-error-handler.service';
import { AuthServiceService } from '../auth-service.service';


@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit{

  employees! : Iemployee[]
  errorstr : string;
  sortProperty= 'fullname';
  sortOrder = 1;
  items: Iemployee[];
  errorMessage: string;

  constructor(private _employeeservice : employeeservice,private _router : Router,
    private toastr: ToastrService,private errhandler : GlobalErrorHandlerService,
    private auth : AuthServiceService)
  {

  }

   ngOnInit()
   {
      this.auth.isAuthenticated();

      this._employeeservice.GetEmployees().subscribe(
        {
          next:(listemp)=>{
            this.employees=listemp;
            console.log(this.employees);
          },
        error:(err:HttpErrorResponse) => {
          console.log(err);
          this.errhandler.handleError(err);
          this.errorMessage = err.error ? err.message : err.statusText;
          this.toastr.error(this.errorMessage,'',{timeOut:4000});
        }
      }
      )
   }

   EditEmployee(employeeid : number)
   {
    this._router.navigate(["employees/edit",employeeid]);
   }

   sortBy(property : string)
   {
    this.sortOrder = property === this.sortProperty ? (this.sortOrder * -1) : 1;
    this.sortProperty = property;
    this.items = [...this.employees.sort((a: any, b: any) => {
        // sort comparison function
        let result = 0;
        if (a[property]  < b[property] ) {
            result = -1;
        }
        if (a[property] > b[property]) {
            result = 1;
        }
        return result * this.sortOrder;
    })];

    this.employees = this.items;
   }

   sortIcon(property : string)
   {
    if (property === this.sortProperty) {
      return this.sortOrder === 1 ? '↑' : '↓';
    }
     return '';
   }



}
