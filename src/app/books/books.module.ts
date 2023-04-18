import { NgModule } from '@angular/core';

import { BooksRoutingModule } from './books-routing.module'
import { BooksComponent } from './books/books.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    BooksComponent,
    BookDetailsComponent
  ],
  imports: [
    SharedModule,
    BooksRoutingModule
  ]
})
export class BooksModule { }
