import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
