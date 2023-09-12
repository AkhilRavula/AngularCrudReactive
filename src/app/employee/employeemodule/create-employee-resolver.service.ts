import { Observable, catchError, of } from "rxjs";
import { Iemployee } from "../IEMPLOYEE";
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { inject } from '@angular/core';
import { employeeservice } from "../employee.service";
import { ToastrService } from "ngx-toastr";

export const CreateEmployeeResolver: ResolveFn<Iemployee> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  _employeeservice:employeeservice = inject(employeeservice),
  router : Router = inject(Router),
  toaster : ToastrService = inject(ToastrService)
) : Observable<Iemployee>=>
{
   const empid = +route.paramMap.get('id');

   return _employeeservice.GetEmployee(empid).pipe(
    catchError((err)=>
    {
      console.log(err);
      toaster.error(err,'',{timeOut:4000});
      router.navigate(['/employees/List'])
      return of(null);
    })
   )
}
