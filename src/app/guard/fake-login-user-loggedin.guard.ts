import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeLoginUserLoggedinGuard implements CanActivate {
  constructor(private router: Router) {
    
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let username = localStorage.getItem('username-key');
      if (username) {
        this.router.navigate(['/']);
        return false;
      }
      
    return true;
  }
}
