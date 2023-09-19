import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IRegister } from './Models/IRegister';
import { Observable, catchError, throwError } from 'rxjs';
import { ILogin } from './Models/ILogin';
import { ILoginResponse } from './Models/ILoginResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  baseUrl  = environment.AuthUrl;

  constructor(private _httpclient : HttpClient,private router :Router) {
    //
  }

  isAuthenticated() : boolean
  {
    if(!this.isTokenExpired(localStorage.getItem("Token")))
    {
      localStorage.removeItem("Token");
      localStorage.removeItem("Username");
      this.router.navigate(['/Login']);
      return false;
    }
    else
      return true;
  }
  private isTokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return expiry * 1000 > Date.now();
  }



  AuthenticateUser(loginUser : ILogin):Observable<ILoginResponse>
  {
       return this._httpclient.post<ILoginResponse>(this.baseUrl+'/Login',loginUser,{
        headers : new HttpHeaders({
          'Content-Type' : 'application/json'
        })
      }).pipe(catchError(this.ErrorHandler));
  }


  RegisterUser(registerUser : IRegister) : Observable<any>
  {
    return this._httpclient.post(this.baseUrl+'/Register',registerUser,{
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }).pipe(catchError(this.ErrorHandler));
  }


  private ErrorHandler(errorresponse : HttpErrorResponse)
  {
      if (errorresponse.error instanceof ErrorEvent) {
        console.error("Client Side Error =>" , errorresponse.message);
      } else
      {
        console.error("Server Side Error => ErrorCode :" , errorresponse.status+'\nMessage :'+ errorresponse.message);

        if(errorresponse.status==404)
        {
          this.router.navigate(['/404']);
        }
        else if(errorresponse.status==500)
        {
          this.router.navigate(['/500']);
        }
        else if(errorresponse.status==401)
        {
          return throwError(()=>errorresponse.error);
        }
        else if(errorresponse.status==400)
         {
          return throwError(()=>errorresponse.error);
         }

      }

      return throwError(()=>'Problem with service .Try again Later');
  }
}
