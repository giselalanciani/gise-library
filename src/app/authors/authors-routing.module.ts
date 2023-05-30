import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorDetailsV3Resolver } from './author-details-v3.resolver';
import { AuthorDetailsComponentV3 } from './author-details-v3/author-details-v3.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { AuthorsV2Component } from './authors-v2/authors-v2.component';
import { AuthorsV3Component } from './authors-v3/authors-v3.component';
import { AuthorsV3Resolver } from './authors.resolver';
import { AuthorsComponent } from './authors/authors.component';

const routes: Routes = [
  { path: '', component: AuthorsComponent },
  { path: 'create', component: AuthorDetailsComponent },
  { path: ':id/edit', component: AuthorDetailsComponent },
  { path: 'v2', component: AuthorsV2Component },
  {
    path: 'v3',
    component: AuthorsV3Component,
    resolve: {
      authorList: AuthorsV3Resolver,
    },
  },
  {
    path: 'create-v3',
    component: AuthorDetailsComponentV3,
    resolve: {
      author: AuthorDetailsV3Resolver,
    },
  },
  {
    path: ':id/edit-v3',
    component: AuthorDetailsComponentV3,
    resolve: {
      author: AuthorDetailsV3Resolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorsRoutingModule {}
