import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { handleError } from '../utils/handleError';
import { IUser } from './models';
import { UsersService } from './services/users.service';

@Injectable({
  providedIn: 'root',
})
export class UsersResolver implements Resolve<IUser[]> {
  constructor(
    private userService: UsersService,
    private routerService: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IUser[]> {
    return this.userService.getUsers().pipe(
      catchError((error) => {
        handleError(error, this.routerService);
        return of([]);
      })
    );
  }
}
