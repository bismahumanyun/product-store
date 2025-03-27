import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> {
        // Await the observable and check if the user is logged in
        const isLoggedIn = await this.authService.isLoggedIn.toPromise();

        if (isLoggedIn) {
            return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }
    }
}
