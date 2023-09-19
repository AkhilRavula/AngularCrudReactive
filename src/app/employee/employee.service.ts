import { Injectable } from "@angular/core";
import { Observable,throwError, catchError, retry } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Iemployee } from "./IEMPLOYEE";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { GlobalErrorHandlerService } from "../Services/global-error-handler.service";


@Injectable({
  providedIn: 'root',
 })

export class employeeservice {

   //baseUrl : string = 'http://localhost:3000/Employees';

   baseUrl  = environment.baseUrl;
   Token = localStorage.getItem("Token");

  constructor(private _httpclient : HttpClient,
    private router : Router,private errhandler :GlobalErrorHandlerService)
  {

  }
     GetEmployees() : Observable<Iemployee[]>
    {
        return this._httpclient.get<Iemployee[]>(this.baseUrl,
          {headers : new HttpHeaders({
          'Content-Type' : 'application/json',
          'Authorization' : 'Bearer ' + this.Token
        })}).pipe(retry(1),catchError(this.ErrorHandler));
    }

    private ErrorHandler(errorresponse : HttpErrorResponse)
    {
        if (errorresponse.error instanceof ErrorEvent) {
          console.error("Client Side Error =>" , errorresponse.message);
          //return this.errhandler.handleError(errorresponse);
          return throwError(()=>errorresponse);
        }
        else
        {
          console.log(window.location.origin);
          console.error("Server Side Error => ErrorCode :" ,errorresponse.message);
          //return this.errhandler.handleError(errorresponse);
          return throwError(()=>errorresponse);
        }
    }

    GetEmployee(empid:number) : Observable<Iemployee>
    {
      return this._httpclient.get<Iemployee>(`${this.baseUrl}/${empid}`,
      {headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + this.Token
      })}).
      pipe(retry(1),
        catchError(this.ErrorHandler)
        );
    }

    AddEmployee(employee:Iemployee) : Observable<Iemployee>
    {

        return this._httpclient.post<Iemployee>(this.baseUrl,employee,{
          headers : new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + this.Token
          })
        }).pipe(catchError(this.ErrorHandler));
    }

    UpdateEmployee(employee:Iemployee) : Observable<void>
    {

        return this._httpclient.put<void>(`${this.baseUrl}/${employee.id}`,employee,{
          headers : new HttpHeaders({
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + this.Token
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
