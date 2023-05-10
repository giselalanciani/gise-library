import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthors, IResponseMessage } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  constructor(private httpClient: HttpClient) {}
  getAuthors() {
    return this.httpClient.get<IAuthors[]>('/api/author');
  }
  getAuthor(id: string) {
    return this.httpClient.get<IAuthors>(`/api/author/${id}`);
  }
  removeAuthor(id: string) {
    return this.httpClient.delete<IResponseMessage>(`/api/author/${id}`);
  }
}
