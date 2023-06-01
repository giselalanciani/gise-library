import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { handleError } from 'src/app/utils/handleError';
import { ICountry } from '../models';
import { CountriesService } from '../services/countries.service';

@Injectable({
  providedIn: 'root',
})
export class GetCountryResolver implements Resolve<ICountry | null> {
  constructor(
    private countryServices: CountriesService,
    private routerService: Router
  ) {}
  resolve(
    activatedRouteService: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ICountry | null> {
    const id = activatedRouteService.paramMap.get('id')!;
    if (id !== null) {
      return this.countryServices.getCountry(id).pipe(
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
