import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { handleError } from '../../utils/handleError';
import { ICategory } from '../models';
import { CategoriesService } from '../services/categories.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesResolver implements Resolve<ICategory[]> {
  constructor(
    private categoriesServices: CategoriesService,
    private routerService: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ICategory[]> {
    return this.categoriesServices.getCategories().pipe(
      catchError((error) => {
        handleError(error, this.routerService);
        return of([]);
      })
    );
  }
}
