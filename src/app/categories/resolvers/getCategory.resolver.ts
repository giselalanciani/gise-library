import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { handleError } from 'src/app/utils/handleError';
import { ICategory } from '../models';
import { CategoriesService } from '../services/categories.service';

@Injectable({
  providedIn: 'root',
})
export class GetCategoryResolver implements Resolve<ICategory | null> {
  constructor(
    private categoryServices: CategoriesService,
    private routerService: Router
  ) {}
  resolve(
    activatedRouteService: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ICategory | null> {
    const id = activatedRouteService.paramMap.get('id')!;
    if (id !== null) {
      return this.categoryServices.getCategory(id).pipe(
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
