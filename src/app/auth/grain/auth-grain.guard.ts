import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GrainService } from 'src/app/services/grain/grain.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGrainGuard implements CanActivate {

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    service: GrainService): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const id = route.params['id'];
    return service.isGrainFromCompany(id);
  }

}
