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
  getUser(id: string) {
    return this.httpClient.get<IUser>(`/api/user/${id}`);
  }
  removeUser(id: string) {
    return this.httpClient.delete<IResponseMessage>(`/api/user/${id}`);
  }
  createUser(user: IUser) {
    return this.httpClient.post<IResponseMessage>(`/api/user`, user);
  }

  editUser(id: string, user: IUser) {
    return this.httpClient.put<IUser>(`/api/user/${id}`, user);
  }
}
