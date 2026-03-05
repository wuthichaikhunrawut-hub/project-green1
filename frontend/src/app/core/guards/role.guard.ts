import { Injectable, inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.authService.getUser();
    
    // Not authenticated, let authGuard (if any) or login page handle it
    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    const { role } = user;

    // Check allowed roles from route data
    const allowedRoles: string[] = route.data['roles'] || [];

    // If no specific roles required, allow access
    if (allowedRoles.length === 0) {
      return true;
    }

    if (allowedRoles.includes(role)) {
      return true;
    }

    // Role is not allowed. Redirect based on role.
    if (role === 'ASSESSOR') {
      this.router.navigate(['/requests']);
    } else {
      this.router.navigate(['/dashboard']);
    }
    
    return false;
  }
}
