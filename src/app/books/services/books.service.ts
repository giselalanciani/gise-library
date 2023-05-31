import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBook } from '../models';
import { IResponseMessage } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private httpClient: HttpClient) {}
  getBooks() {
    return this.httpClient.get<IBook[]>('/api/book');
  }
  getBook(id: string) {
    return this.httpClient.get<IBook>(`/api/book/${id}`);
  }

  removeBook(id: string) {
    return this.httpClient.delete<IResponseMessage>(`/api/book/${id}`);
  }

  createBook(book: IBook) {
    return this.httpClient.post<IResponseMessage>(`/api/book`, book);
  }

  editBook(id: string, book: IBook) {
    return this.httpClient.put<IBook>(`/api/book/${id}`, book);
  }
}
