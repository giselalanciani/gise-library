import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { handleError } from '../utils/handleError';
import { IBook } from './models';
import { BooksService } from './services/books.service';

@Injectable({
  providedIn: 'root',
})
export class BooksResolver implements Resolve<IBook[]> {
  constructor(
    private booksServices: BooksService,
    private routerService: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IBook[]> {
    return this.booksServices.getBooks().pipe(
      catchError((error) => {
        handleError(error, this.routerService);
        return of([]);
      })
    );
  }
}
