import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from '../categories2/category.service';
import { ICategory } from '../models';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent {
  public categories!: ICategory;
  private categories$: Observable<ICategory[]>;

constructor(private route: ActivatedRoute, private categoryService: CategoryService){
  const id = parseInt(this.route.snapshot.paramMap.get('id')!);
  this.categories$ = this.categoryService.getCategory(id);
}
}
