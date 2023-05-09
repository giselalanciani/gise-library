import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorsComponent } from './authors/authors.component';
import { SharedModule } from '../shared/shared.module';
import { AuthorDetailsComponent } from './author-details/author-details.component';


@NgModule({
  declarations: [
    AuthorsComponent,
    AuthorDetailsComponent
  ],
  imports: [
    CommonModule,
    AuthorsRoutingModule,
    SharedModule
  ]
})
export class AuthorsModule { }
