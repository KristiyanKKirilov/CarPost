import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../user/user.service";

export const AdminGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) =>{
    const userService = inject(UserService);
    const router = inject(Router);
    
    if(!userService.isAdmin){
        router.navigate(['/404']);
        return false;
    }

    return true;
}
