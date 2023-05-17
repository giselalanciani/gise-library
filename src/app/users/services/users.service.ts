import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseMessage } from 'src/app/models';
import { IUser } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}
  getUsers() {
    return this.httpClient.get<IUser[]>('/api/user');
  }
  removeUser(id: string) {
    return this.httpClient.delete<IResponseMessage>(`/api/user/${id}`);
  }
}
