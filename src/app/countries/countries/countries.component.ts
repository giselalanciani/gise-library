import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ICountry } from '../models';
import { CountriesService } from '../services/countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {
  countryList$: Observable<ICountry[]>;
  countryList: ICountry[] = [];
  countryListSubscription!: Subscription;

  columnsToDisplay = ['name'];

  constructor(public countryServices: CountriesService) {
    this.countryList$ = this.countryServices.getCountries();
  }

  ngOnInit(): void {
    this.countryListSubscription = this.countryList$.subscribe((countries) => {
      this.countryList = countries;
    });
  }
}
