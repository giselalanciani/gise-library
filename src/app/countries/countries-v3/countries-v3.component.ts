import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DeleteCountryDialog } from '../countries/countries.component';
import { ICountry } from '../models';
import { CountriesService } from '../services/countries.service';

@Component({
  selector: 'app-countries-v3',
  templateUrl: './countries-v3.component.html',
  styleUrls: ['./countries-v3.component.scss'],
})
export class CountriesV3Component implements OnInit, OnDestroy {
  countryList$: Observable<ICountry[]>;
  countryList: ICountry[] = [];
  filteredCountryList: ICountry[] = [];
  countryListSubscription!: Subscription;
  removeCountrySubscription!: Subscription;
  dialogDeleteSubscription!: Subscription;

  sortState: { column: string; order: 'asc' | 'desc' } = {
    column: '',
    order: 'desc',
  };

  constructor(
    public countryServices: CountriesService,
    public dialogService: MatDialog,
    private activatedRouteService: ActivatedRoute
  ) {
    this.countryList$ = this.countryServices.getCountries();
  }

  ngOnInit(): void {
    this.countryListSubscription = this.activatedRouteService.data.subscribe(
      (data) => {
        this.countryList = data['countriesList'];
        this.filteredCountryList = data['countriesList'];
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();

    this.filteredCountryList = this.countryList.filter((country) =>
      country.name.toLowerCase().includes(filterValue)
    );
  }
  sortTable(event: Event) {
    const element = event.target as HTMLTableCellElement;
    const columnName = element.getAttribute('name');

    switch (columnName) {
      case 'name':
        this.sortState = {
          column: 'name',
          order: this.sortState.order === 'desc' ? 'asc' : 'desc',
        };
        this.sortByPropertyName(this.sortState.order);
        break;
      default:
        break;
    }
  }

  sortByPropertyName(order: 'asc' | 'desc') {
    this.filteredCountryList.sort((a, b) =>
      order === 'asc'
        ? a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        : b.name.toLowerCase().localeCompare(a.name.toLowerCase())
    );
  }

  ngOnDestroy(): void {
    this.countryListSubscription.unsubscribe();
  }
  openDeleteDialog(country: ICountry) {
    const dialogRef = this.dialogService.open(DeleteCountryDialog, {
      data: country,
    });

    this.dialogDeleteSubscription?.unsubscribe();
    this.dialogDeleteSubscription = dialogRef
      .afterClosed()
      .subscribe((data) => {
        if (data === true) {
          this.removeCountrySubscription?.unsubscribe();

          if (country.id !== undefined) {
            this.removeCountrySubscription = this.countryServices
              .removeCountry(country.id)
              .subscribe(() => {
                this.countryListSubscription.unsubscribe();
                this.countryListSubscription = this.countryList$.subscribe(
                  (countries) => {
                    this.countryList = countries;
                    this.filteredCountryList = countries;
                  }
                );
              });
          }
        }
      });
  }
}
