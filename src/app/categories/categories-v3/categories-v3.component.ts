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
  filteredCategoryList: ICategory[] = [];
  categoryListSubscription!: Subscription;
  removeCategorySubscription!: Subscription;
  category: any;

  sortState: { column: string; order: 'asc' | 'desc' } = {
    column: '',
    order: 'desc',
  };
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
        this.filteredCategoryList = data['categoriesList'];
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();

    this.filteredCategoryList = this.categoryList.filter((category) =>
    category.name.toLowerCase().includes(filterValue)
    );
  }

  sortTable(event: Event) {
    const element = event.target as HTMLTableCellElement;
    const columnName = element.getAttribute('name');

    switch (columnName) {
      case 'name':
        this.sortState = {
          column: 'name',
          order: this.sortState.order === 'desc' ? 'asc' : 'desc',
        };
        this.sortByPropertyName(this.sortState.order);
        break;
      default:
        break;
    }
  }

  sortByPropertyName(order: 'asc' | 'desc') {
    this.filteredCategoryList.sort((a, b) =>
      order === 'asc'
        ? a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        : b.name.toLowerCase().localeCompare(a.name.toLowerCase())
    );
  }



  ngOnDestroy(): void {
    this.categoryListSubscription.unsubscribe();
  }
  showArrow(column: string, order: 'asc' | 'desc'): boolean {
    return this.sortState.column === column && this.sortState.order === order;
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
                    this.filteredCategoryList = categories;
                  }
                );
              });
          }
        }
      });
  }
}
