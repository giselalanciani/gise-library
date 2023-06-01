import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesV2Component } from './categories-v2/categories-v2.component';
import { CategoriesV3Component } from './categories-v3/categories-v3.component';
import { CategoriesResolver } from './resolvers/getCategories.resolver';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryDetailsComponentV3 } from './category-details-v3/category-details-v3.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { GetCategoryResolver } from './resolvers/getCategory.resolver';

const routes: Routes = [
  { path: '', component: CategoriesComponent },
  { path: 'create', component: CategoryDetailsComponent },
  { path: ':id/edit', component: CategoryDetailsComponent },
  { path: 'v2', component: CategoriesV2Component },
  {
    path: 'v3',
    component: CategoriesV3Component,
    resolve: {
      categoriesList: CategoriesResolver,
    },
  },
  {
    path: 'create-v3',
    component: CategoryDetailsComponentV3,
    resolve: {
      category: GetCategoryResolver,
    },
  },
  {
    path: ':id/edit-v3',
    component: CategoryDetailsComponentV3,
    resolve: {
      category: GetCategoryResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
