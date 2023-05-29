import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';

const handleError = (
  errorResponse: HttpErrorResponse,
  routerService: Router
) => {
  switch (errorResponse.status) {
    case 404:
      routerService.navigate(['/not-found']);
      return of(null);
    case 403:
      routerService.navigate(['/unauthorized']);
      return of(null);
    default:
      routerService.navigate(['/error']);
      return of(null);
  }
};

export { handleError };
