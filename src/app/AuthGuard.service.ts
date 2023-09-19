import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import {  BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ErrorModalComponent } from "./shared/Modals/error-modal/error-modal.component";
import { inject } from "@angular/core";
import { Observable } from "rxjs";

export const AuthGuardService : CanActivateFn =
 (route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,router : Router = inject(Router)
  ,modal : BsModalService=inject(BsModalService)) : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree  =>
 {

    // bsModalRef : BsModalRef;
    if(localStorage.getItem("Token"))
    {
      return true;
    }
    else
    {
       //alert("Log in to Continue");
      const bsModalRef = modal.show(ErrorModalComponent);
       bsModalRef.content.redirectOnOk.subscribe(_ => {router.navigate(['/Login'])});

       return false;
    }

 }
