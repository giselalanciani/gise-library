import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BooksV2Component } from './books-v2/books-v2.component';
import { BooksComponent } from './books/books.component';

const routes: Routes = [
  { path: '', component: BooksComponent },
  { path: 'create', component: BookDetailsComponent },
  { path: ':id/edit', component: BookDetailsComponent },
  { path: 'v2', component: BooksV2Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
