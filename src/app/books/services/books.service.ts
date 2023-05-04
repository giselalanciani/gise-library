import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBook, IResponseMessage } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private httpClient: HttpClient) {}
  getBooks() {
    return this.httpClient.get<IBook[]>('/api/book');
  }
  getBook(id: number) {
    return this.httpClient.get<IBook>(`/api/book/${id}`);
  }

  removeBook(id: number) {
    return this.httpClient.delete<IResponseMessage>(`/api/book/${id}`);
  }
}
