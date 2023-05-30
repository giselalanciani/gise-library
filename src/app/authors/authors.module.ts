import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorsRoutingModule } from './authors-routing.module';
import {
  AuthorsComponent,
  DeleteAuthorDialog,
} from './authors/authors.component';
import { SharedModule } from '../shared/shared.module';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { AuthorsV2Component } from './authors-v2/authors-v2.component';
import { AuthorsV3Component } from './authors-v3/authors-v3.component';
import { AuthorDetailsComponentV3 } from './author-details-v3/author-details-v3.component';

@NgModule({
  declarations: [
    AuthorsComponent,
    AuthorDetailsComponent,
    DeleteAuthorDialog,
    AuthorsV2Component,
    AuthorsV3Component,
    AuthorDetailsComponentV3
  ],
  imports: [CommonModule, AuthorsRoutingModule, SharedModule],
})
export class AuthorsModule {}
