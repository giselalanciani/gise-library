import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { DeleteCountryDialog } from '../countries/countries.component';
import { ICountry } from '../models';
import { CountriesService } from '../services/countries.service';

@Component({
  selector: 'app-countries-v2',
  templateUrl: './countries-v2.component.html',
  styleUrls: ['./countries-v2.component.scss'],
})
export class CountriesV2Component implements OnInit {
  countryList$: Observable<ICountry[]>;
  countryList: ICountry[] = [];
  countryListSubscription!: Subscription;
  removeCountrySubscription!: Subscription;
  dialogDeleteSubscription!: Subscription;

  constructor(
    public countryServices: CountriesService,
    public dialogService: MatDialog
  ) {
    this.countryList$ = this.countryServices.getCountries();
  }

  ngOnInit(): void {
    this.countryListSubscription = this.countryList$.subscribe((countries) => {
      this.countryList = countries;
    });
  }
  ngOnDestroy(): void {
    this.countryListSubscription.unsubscribe();
    this.removeCountrySubscription?.unsubscribe();
    this.dialogDeleteSubscription?.unsubscribe();
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
                  }
                );
              });
          }
        }
      });
  }
}
