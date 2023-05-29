import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesV2Component } from './categories-v2/categories-v2.component';
import { CategoriesV3Component } from './categories-v3/categories-v3.component';
import { CategoriesResolver } from './categories.resolver';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
