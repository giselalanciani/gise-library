import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseMessage } from 'src/app/models';
import { ICategory } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}
  getCategories() {
    return this.httpClient.get<ICategory[]>('/api/categories');
  }
  getCategory(id: string) {
    return this.httpClient.get<ICategory>(`/api/categories/${id}`);
  }
  removeCategories(id: string) {
    return this.httpClient.delete<IResponseMessage>(`/api/categories/${id}`);
  }
  createCategory(category: ICategory) {
    return this.httpClient.post<IResponseMessage>(`/api/categories`, category);
  }

  editCategory(id: string, category: ICategory) {
    return this.httpClient.put<ICategory>(`/api/categories/${id}`, category);
  }
}
