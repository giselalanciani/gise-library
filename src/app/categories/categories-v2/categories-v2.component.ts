import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { DeleteCategoryDialog } from '../categories/categories.component';
import { ICategory } from '../models';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categories-v2',
  templateUrl: './categories-v2.component.html',
  styleUrls: ['./categories-v2.component.scss'],
})
export class CategoriesV2Component implements OnInit {
  categoryList$: Observable<ICategory[]>;
  categoryList: ICategory[] = [];
  categoryListSubscription!: Subscription;
  removeCategorySubscription!: Subscription;
category: any;
  constructor(
    public categoryServices: CategoriesService,
    public dialogService: MatDialog
  ) {
    this.categoryList$ = this.categoryServices.getCategories();
  }

  ngOnInit(): void {
    this.categoryListSubscription = this.categoryList$.subscribe(
      (categories) => {
        this.categoryList = categories;
      }
    );
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
