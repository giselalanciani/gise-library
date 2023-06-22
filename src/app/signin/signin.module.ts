import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SigninRoutingModule } from './signin-routing.module';
import { SigninComponent } from './signIn/signin.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SigninComponent],
  imports: [CommonModule, SigninRoutingModule, SharedModule],
})
export class SigninModule {}
