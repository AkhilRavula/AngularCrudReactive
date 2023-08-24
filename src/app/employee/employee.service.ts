import { Injectable } from "@angular/core";
import { Observable,throwError, catchError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Iemployee } from "./IEMPLOYEE";


@Injectable({
  providedIn: 'root',
 })

export class employeeservice {

   //baseUrl : string = 'http://localhost:3000/Employees';

   baseUrl  ='http://localhost:5142/api/Employees';

  constructor(private _httpclient : HttpClient)
  {

  }


     GetEmployees() : Observable<Iemployee[]>
    {

        return this._httpclient.get<Iemployee[]>(this.baseUrl).pipe
        (catchError(this.ErrorHandler));

    }

    private ErrorHandler(errorresponse : HttpErrorResponse)
    {
        if (errorresponse.error instanceof ErrorEvent) {
          console.error("Client Side Error =>" , errorresponse.error.message);
        } else {
          console.error("Server Side Error =>" , errorresponse.error.message);
        }

        return throwError(()=>'Problem with service .Try again Later');
    }

    GetEmployee(empid:number) : Observable<Iemployee>
    {
      return this._httpclient.get<Iemployee>(`${this.baseUrl}/${empid}`).
      pipe(catchError(this.ErrorHandler));
    }

    AddEmployee(employee:Iemployee) : Observable<Iemployee>
    {

        return this._httpclient.post<Iemployee>(this.baseUrl,employee,{
          headers : new HttpHeaders({
            'Content-Type' : 'application/json'
          })
        }).pipe(catchError(this.ErrorHandler));
    }

    UpdateEmployee(employee:Iemployee) : Observable<void>
    {

        return this._httpclient.put<void>(`${this.baseUrl}/${employee.id}`,employee,{
          headers : new HttpHeaders({
            'Content-Type' : 'application/json'
          })
        }).pipe(catchError(this.ErrorHandler));
    }


    deleteEmployee(empid:number) : Observable<void>
    {

      return this._httpclient.delete<void>(`${this.baseUrl}/${empid}`).
      pipe(catchError(this.ErrorHandler));

    }

    deleteSkill(skillId:number) : Observable<void>
    {
      return this._httpclient.delete<void>(`${this.baseUrl}/Skills/${skillId}`).
      pipe(catchError(this.ErrorHandler));
    }

}
