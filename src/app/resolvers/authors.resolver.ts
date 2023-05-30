import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { handleError } from '../utils/handleError';
import { IAuthors } from './models';
import { AuthorsService } from './services/authors.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorsV3Resolver implements Resolve<IAuthors[]> {
  constructor(
    private authorsService: AuthorsService,
    private routerService: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IAuthors[]> {
    return this.authorsService.getAuthors().pipe(
      catchError((error) => {
        handleError(error, this.routerService);
        return of([]);
      })
    );
  }
}
