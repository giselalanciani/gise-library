import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ICategory } from '../models';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  categories$: Observable<ICategory[]>;

  constructor(
    private route: ActivatedRoute,
    public categoryService: CategoryService
  ) {
    this.categories$ = this.categoryService.getCategories();
  }
}
