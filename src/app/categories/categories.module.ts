import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import {
  CategoriesComponent,
  DeleteCategoryDialog,
} from './categories/categories.component';
import { SharedModule } from '../shared/shared.module';
import { CategoriesV2Component } from './categories-v2/categories-v2.component';
import { CategoriesV3Component } from './categories-v3/categories-v3.component';
import { CategoryDetailsComponentV3 } from './category-details-v3/category-details-v3.component';

@NgModule({
  declarations: [
    CategoriesComponent,
    DeleteCategoryDialog,
    CategoriesV2Component,
    CategoriesV3Component,
    CategoryDetailsComponentV3,
  ],
  imports: [CommonModule, CategoriesRoutingModule, SharedModule],
})
export class CategoriesModule {}
