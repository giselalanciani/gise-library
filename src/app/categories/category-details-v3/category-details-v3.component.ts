import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICategory } from '../models';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-category-details-v3',
  templateUrl: './category-details-v3.component.html',
  styleUrls: ['./category-details-v3.component.scss'],
})
export class CategoryDetailsComponentV3 implements OnDestroy {
  category: ICategory | null = null;

  getCategorySubscription!: Subscription;
  editCategorySubscription!: Subscription;
  createCategorySubscription!: Subscription;

  form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
  });
  constructor(
    public categoryServices: CategoriesService,
    private activatedRouteService: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.getCategorySubscription = this.activatedRouteService.data.subscribe(
      (data) => {
        this.category = data['category'];
        if (this.category !== null) {
          this.form.controls['name'].setValue(this.category.name);
        }
      }
    );
  }
  ngOnDestroy(): void {
    this.getCategorySubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
    this.createCategorySubscription?.unsubscribe();
  }
  onSubmit() {
    if (this.form.valid === true) {
      const category: ICategory = {
        name: this.form.controls['name'].value,
        id: '',
      };

      if (this.category === null) {
        this.createCategorySubscription?.unsubscribe();
        this.createCategorySubscription = this.categoryServices
          .createCategory(category)
          .subscribe(() => {
            this.snackBar.open('La categoria fue guardada', 'ok');
            this.router.navigate(['categories']);
          });
      } else {
        this.editCategorySubscription?.unsubscribe();
        this.editCategorySubscription = this.categoryServices
          .editCategory(this.category.id, category)
          .subscribe(() => {
            this.snackBar.open('La categoria fue actualizada', 'ok');
            this.router.navigate(['categories']);
          });
      }
    }
  }

  hasFieldError(fieldName: string, validationName: string): boolean {
    return this.form.controls[fieldName].hasError(validationName);
  }
}
