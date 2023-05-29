import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'books',
    loadChildren: () =>
      import('./books/books.module').then((m) => m.BooksModule),
  },
  {
    path: 'authors',
    loadChildren: () =>
      import('./authors/authors.module').then((m) => m.AuthorsModule),
  },
  {
    path: 'countries',
    loadChildren: () =>
      import('./countries/countries.module').then((m) => m.CountriesModule),
  },
  { path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) },
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  {
    path: 'not-found', component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
