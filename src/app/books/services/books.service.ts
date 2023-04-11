import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBook } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private httpClient: HttpClient) {}
  getBooks() {
    return this.httpClient.get<IBook[]>('/api/book');
  }
  getBook(id: number) {
    return this.httpClient.get<IBook[]>(`/api/book/${id}`);
  }
}
