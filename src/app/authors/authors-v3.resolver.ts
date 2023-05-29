import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IAuthors } from './models';

@Injectable({
  providedIn: 'root'
})
export class AuthorsV3Resolver implements Resolve<IAuthors[]> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAuthors[]> {
    return of(true);
  }
}
