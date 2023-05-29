import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersV2Component } from './users-v2/users-v2.component';
import { UsersV3Component } from './users-v3/users-v3.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'create', component: UserDetailsComponent },
  { path: ':id/edit', component: UserDetailsComponent },
  { path: 'v2', component: UsersV2Component },
  { path: 'v3', component: UsersV3Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
