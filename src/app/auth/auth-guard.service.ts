import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/';
import { AuthService } from './auth.service';

@Injectable()

/* implementa CanActivate que es una interfase */
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // trae desde authService si esta logueado o no y lo retorna
    return this.authService.isAuthenticated();
  }



}
