import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { AuthorsComponent } from './authors/authors.component';

const routes: Routes = [
  { path: '', component: AuthorsComponent },
  { path: 'create', component: AuthorDetailsComponent },
  { path: ':id/edit', component: AuthorDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorsRoutingModule {}
