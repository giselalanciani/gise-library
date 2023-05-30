import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BooksV2Component } from './books-v2/books-v2.component';
import { BooksV3Component } from './books-v3/books-v3.component';
import { BooksResolver } from './resolvers/getBooks.resolver';
import { BooksComponent } from './books/books.component';
import { BookDetailsComponentV3 } from './book-details-v3/book-details-v3.component';
import { GetBookResolver } from './resolvers/get-book.resolver';

const routes: Routes = [
  { path: '', component: BooksComponent },
  { path: 'create', component: BookDetailsComponent },
  { path: ':id/edit', component: BookDetailsComponent },
  { path: 'v2', component: BooksV2Component },
  {
    path: 'v3',
    component: BooksV3Component,
    resolve: {
      booksList: BooksResolver,
    },
  },
  {
    path: 'create-v3',
    component: BookDetailsComponentV3,
    resolve: {
      book: GetBookResolver,
    },
  },
  {
    path: ':id/edit-v3',
    component: BookDetailsComponentV3,
    resolve: {
      book: GetBookResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
