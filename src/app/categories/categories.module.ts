import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import {
  CategoriesComponent,
  DeleteCategoryDialog,
} from './categories/categories.component';
import { SharedModule } from '../shared/shared.module';
import { CategoriesV2Component } from './categories-v2/categories-v2.component';

@NgModule({
  declarations: [CategoriesComponent, DeleteCategoryDialog, CategoriesV2Component],
  imports: [CommonModule, CategoriesRoutingModule, SharedModule],
})
export class CategoriesModule {}
