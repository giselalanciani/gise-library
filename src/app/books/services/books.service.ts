import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBook, IResponseMessage, IStoredMessage } from '../models';

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

  createBook(book: IBook) {
    return this.httpClient.post<IStoredMessage>(`/api/book`, book);
  }

  editBook(id: number, book: IBook) {
    return this.httpClient.put<IBook>(`/api/book/${id}`, book);
  }
}
