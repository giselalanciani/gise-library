import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { handleError } from 'src/app/utils/handleError';
import { IUser } from '../models';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root',
})
export class GetUserResolver implements Resolve<IUser | null> {
  constructor(
    private userServices: UsersService,
    private routerService: Router
  ) {}
  resolve(
    activatedRouteService: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IUser | null> {
    const id = activatedRouteService.paramMap.get('id')!;
    if (id !== null) {
      return this.userServices.getUser(id).pipe(
        catchError((error) => {
          handleError(error, this.routerService);
          return of(null);
        })
      );
    } else {
      return of(null);
    }
  }
}
