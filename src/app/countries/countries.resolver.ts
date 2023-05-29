import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { handleError } from '../utils/handleError';
import { ICountry } from './models';
import { CountriesService } from './services/countries.service';

@Injectable({
  providedIn: 'root',
})
export class CountriesResolver implements Resolve<ICountry[]> {
  constructor(
    private countryServices: CountriesService,
    private routerService: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ICountry[]> {
    return this.countryServices.getCountries().pipe(
      catchError((error) => {
        handleError(error, this.routerService);
        return of([]);
      })
    );
  }
}
