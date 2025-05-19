import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { select, Store } from "@ngrx/store";
import * as fromRoot from "@app/store";
import * as fromUser from "@app/store/user";
import { filter, map, Observable, tap } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private objRouter: Router,
    private objStore: Store<fromRoot.State>
  ) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.check();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.check();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.check();
  }

  private check(): Observable<boolean> {
    return this.objStore
        .pipe(select(fromUser.getUserState))
        .pipe(
          filter( objState => !objState.loading),
          tap( objState => {
            if (!objState.entity?.strEmail) {
              this.objRouter.navigate(['/auth/login']);
            }
          }),
          map( objState => !!objState.entity?.strEmail)
        );
  }
}
