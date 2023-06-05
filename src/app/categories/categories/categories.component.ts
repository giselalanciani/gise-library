import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { ICategory } from '../models';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categoryList$: Observable<ICategory[]>;
  categoryList = new MatTableDataSource<ICategory>([]);
  categoryListSubscription!: Subscription;
  removeCategorySubscription!: Subscription;

  columnsToDisplay = ['name', 'actions'];

  constructor(
    public categoryServices: CategoriesService,
    public dialogService: MatDialog
  ) {
    this.categoryList$ = this.categoryServices.getCategories();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.categoryList.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.categoryListSubscription = this.categoryList$.subscribe(
      (categories) => {
        this.categoryList.data = categories;
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
                    this.categoryList.data = categories;
                  }
                );
              });
          }
        }
      });
  }
}
@Component({
  selector: 'delete-category-dialog',
  templateUrl: './delete-category-dialog.html',
})
export class DeleteCategoryDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ICategory) {}
}
