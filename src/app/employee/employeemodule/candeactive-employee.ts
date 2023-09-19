import { ActivatedRouteSnapshot, CanDeactivateFn, RouterStateSnapshot } from "@angular/router";
import { CreateEmployeeComponent } from "../create-employee.component";

export const canDeactiveRoute : CanDeactivateFn<CreateEmployeeComponent> =
(Component : CreateEmployeeComponent,currentRoute: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot, nextState: RouterStateSnapshot):boolean=>
{

   return Component.canExit();
}
