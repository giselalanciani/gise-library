import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DeleteCategoryDialog } from '../categories/categories.component';
import { ICategory } from '../models';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categories-v3',
  templateUrl: './categories-v3.component.html',
  styleUrls: ['./categories-v3.component.scss'],
})
export class CategoriesV3Component implements OnInit, OnDestroy {
  categoryList$: Observable<ICategory[]>;
  categoryList: ICategory[] = [];
  categoryListSubscription!: Subscription;
  removeCategorySubscription!: Subscription;
  category: any;
  constructor(
    public categoryServices: CategoriesService,
    public dialogService: MatDialog,
    private activatedRouteService: ActivatedRoute
  ) {
    this.categoryList$ = this.categoryServices.getCategories();
  }

  ngOnInit(): void {
    this.categoryListSubscription = this.activatedRouteService.data.subscribe(
      (data) => {
        this.categoryList = data['categoriesList'];
      }
    );
  }
  ngOnDestroy(): void {
    this.categoryListSubscription.unsubscribe();
  }
  openDeleteDialog(category: ICategory) {
    const dialogRef = this.dialogService.open(DeleteCategoryDialog, {
      data: category,
    });

    this.categoryListSubscription?.unsubscribe();
    this.categoryListSubscription = dialogRef
      .afterClosed()
      .subscribe((data) => {
        if (data === true) {
          this.removeCategorySubscription?.unsubscribe();

          if (category.id !== undefined) {
            this.removeCategorySubscription = this.categoryServices
              .removeCategories(category.id)
              .subscribe(() => {
                this.categoryListSubscription.unsubscribe();
                this.categoryListSubscription = this.categoryList$.subscribe(
                  (categories) => {
                    this.categoryList = categories;
                  }
                );
              });
          }
        }
      });
  }
}
