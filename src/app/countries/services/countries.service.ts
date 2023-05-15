import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICountry, IResponseMessage } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  constructor(private httpClient: HttpClient) {}
  getCountries() {
    return this.httpClient.get<ICountry[]>('/api/country');
  }
  removeCountry(id: string) {
    return this.httpClient.delete<IResponseMessage>(`/api/country/${id}`);
  }
}
