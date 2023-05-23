import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { DeleteUserDialog, UsersComponent } from './users/users.component';
import { SharedModule } from '../shared/shared.module';
import { UsersV2Component } from './users-v2/users-v2.component';


@NgModule({
  declarations: [
    UsersComponent,
    DeleteUserDialog,
    UsersV2Component,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
