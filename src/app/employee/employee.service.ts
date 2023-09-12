import { Injectable } from "@angular/core";
import { Observable,throwError, catchError, retry } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Iemployee } from "./IEMPLOYEE";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root',
 })

export class employeeservice {

   //baseUrl : string = 'http://localhost:3000/Employees';

   baseUrl  = environment.baseUrl;

  constructor(private _httpclient : HttpClient)
  {

  }
     GetEmployees() : Observable<Iemployee[]>
    {
        return this._httpclient.get<Iemployee[]>(this.baseUrl).pipe(retry(1),catchError(this.ErrorHandler));
    }

    private ErrorHandler(errorresponse : HttpErrorResponse)
    {
        if (errorresponse.error instanceof ErrorEvent) {
          console.error("Client Side Error =>" , errorresponse.message);
        } else
        {
          console.error("Server Side Error => ErrorCode :" , errorresponse.status+'\nMessage :'+ errorresponse.message);
        }

        return throwError(()=>'Problem with service .Try again Later');
    }

    GetEmployee(empid:number) : Observable<Iemployee>
    {
      return this._httpclient.get<Iemployee>(`${this.baseUrl}/${empid}`).
      pipe(retry(1),
        catchError(this.ErrorHandler)
        );
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
