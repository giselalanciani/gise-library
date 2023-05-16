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
  removeCategories(id: string) {
    return this.httpClient.delete<IResponseMessage>(`/api/categories/${id}`);
  }
}
