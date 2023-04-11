import { HttpClient } from '@angular/common/http';
import { ICategory } from '../models';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}
  getCategories() {
    return this.httpClient.get<ICategory[]>(
      '/api/categories'
    );
  }
}
