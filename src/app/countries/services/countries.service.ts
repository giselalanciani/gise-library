import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICountry } from '../models';
import { IResponseMessage } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  constructor(private httpClient: HttpClient) {}
  getCountries() {
    return this.httpClient.get<ICountry[]>('/api/country');
  }
  getCountry(id: string) {
    return this.httpClient.get<ICountry>(`/api/country/${id}`);
  }
  removeCountry(id: string) {
    return this.httpClient.delete<IResponseMessage>(`/api/country/${id}`);
  }
  createCountry(country: ICountry) {
    return this.httpClient.post<IResponseMessage>(`/api/country`, country);
  }

  editCountry(id: string, country: ICountry) {
    return this.httpClient.put<ICountry>(`/api/country/${id}`, country);
  }
}
