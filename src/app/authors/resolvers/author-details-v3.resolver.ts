import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { handleError } from '../../utils/handleError';
import { IAuthors } from '../models';
import { AuthorsService } from '../services/authors.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorDetailsV3Resolver implements Resolve<IAuthors | null> {
  constructor(
    private authorsService: AuthorsService,
    private routerService: Router
  ) {}

  resolve(
    activatedRouteService: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IAuthors | null> {
    const id = activatedRouteService.paramMap.get('id')!;
    if (id !== null) {
      return this.authorsService.getAuthor(id).pipe(
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
