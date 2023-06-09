import { NgModule } from '@angular/core';

import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent, DeleteBookDialog } from './books/books.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { SharedModule } from '../shared/shared.module';
import { BooksV2Component } from './books-v2/books-v2.component';
import { BooksV3Component } from './books-v3/books-v3.component';
import { BookDetailsComponentV3 } from './book-details-v3/book-details-v3.component';

@NgModule({
  declarations: [
    BooksComponent,
    BookDetailsComponent,
    DeleteBookDialog,
    BooksV2Component,
    BooksV3Component,
    BookDetailsComponentV3,
  ],
  imports: [SharedModule, BooksRoutingModule],
})
export class BooksModule {}
