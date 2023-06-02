import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersV2Component } from './users-v2/users-v2.component';
import { UsersV3Component } from './users-v3/users-v3.component';
import { UsersResolver } from './resolver/getUsers.resolver';
import { UsersComponent } from './users/users.component';
import { UserDetailsComponentV3 } from './user-details-v3/user-details-v3.component';
import { GetUserResolver } from './resolver/getUser.resolver';

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'create', component: UserDetailsComponent },
  { path: ':id/edit', component: UserDetailsComponent },
  { path: 'v2', component: UsersV2Component },
  {
    path: 'v3',
    component: UsersV3Component,
    resolve: {
      usersList: UsersResolver,
    },
  },
  {
    path: 'create-v3',
    component: UserDetailsComponentV3,
    resolve: {
      user: GetUserResolver,
    },
  },
  {
    path: ':id/edit-v3',
    component: UserDetailsComponentV3,
    resolve: {
      user: GetUserResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
