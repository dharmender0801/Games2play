import { Global } from "./../global/global";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LoginAuthGuard implements CanActivate {
  /**
   *
   */
  constructor(private _global: Global,
    private _router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let loginData = localStorage.getItem(this._global.USER_ID);
    if (loginData) {
      return true;
    }
    this._router.navigate(['/']);
    return false;
  }
}
