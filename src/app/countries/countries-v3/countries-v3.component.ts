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
  countryListSubscription!: Subscription;
  removeCountrySubscription!: Subscription;
  dialogDeleteSubscription!: Subscription;

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
      }
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
                  }
                );
              });
          }
        }
      });
  }
}
