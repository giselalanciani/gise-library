import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthors } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  constructor(private httpClient: HttpClient) {}
  getAuthors() {
    return this.httpClient.get<IAuthors[]>('/api/authors');
  }
}
