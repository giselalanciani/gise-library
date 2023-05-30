import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { handleError } from 'src/app/utils/handleError';
import { IBook } from '../models';
import { BooksService } from '../services/books.service';

@Injectable({
  providedIn: 'root',
})
export class GetBookResolver implements Resolve<IBook | null> {
  public id: number | null = null;
  constructor(
    private booksServices: BooksService,
    private routerService: Router
  ) {}
  resolve(
    activatedRouteService: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IBook | null> {
    const id = activatedRouteService.paramMap.get('id')!;
    if (id !== null) {
      this.id = parseFloat(id);
      return this.booksServices.getBook(this.id).pipe(
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
