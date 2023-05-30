import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IAuthors } from './models';
import { AuthorsService } from './services/authors.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorDetailsV3Resolver implements Resolve<IAuthors | null> {
  constructor(
    private authorsService: AuthorsService,
    private activateRouteService: ActivatedRoute
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IAuthors | null> {
    const id = this.activateRouteService.snapshot.paramMap.get('id')!;
    if (id !== null) {
      return this.authorsService.getAuthor(id);
    } else {
      return of(null);
    }
  }
}
