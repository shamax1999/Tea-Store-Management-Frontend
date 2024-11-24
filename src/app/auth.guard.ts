import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role'];
    const isAuthenticated = this.authService.isAuthenticated();
    const userRole = this.authService.getUserRole();

    if (isAuthenticated && userRole === expectedRole) {
      return true;
    } else {
      this.router.navigate(['/login']); 
      return false;
    }
  }
}
