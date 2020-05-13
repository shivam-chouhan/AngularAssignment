import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({providedIn : 'root'})
export class AuthGuard implements CanActivate{
constructor(private authService:AuthService,
    private router:Router
    ){}

    canActivate(route : ActivatedRouteSnapshot , routeState : RouterStateSnapshot){
        return this.authService.user.pipe(
            take(1),
            map(user=>{
            const isAuthenticated =  !!user;
            if(isAuthenticated){
                return true
            }
            return this.router.createUrlTree(['/userAuthentication'])
        }));
    }
}