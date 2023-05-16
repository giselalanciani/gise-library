import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { ICountry } from '../models';
import { CountriesService } from '../services/countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit, OnDestroy {
  countryList$: Observable<ICountry[]>;
  countryList: ICountry[] = [];
  countryListSubscription!: Subscription;
  removeCountrySubscription!: Subscription;
  dialogDeleteSubscription! : Subscription;

  columnsToDisplay = ['name', 'actions'];

  constructor(public countryServices: CountriesService, public dialogService: MatDialog) {
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
    const dialogRef = this.dialogService.open(DeleteCountryDialog, { data: country });

    this.dialogDeleteSubscription?.unsubscribe();
    this.dialogDeleteSubscription = dialogRef.afterClosed().subscribe((data) => {
      if (data === true) {
        this.removeCountrySubscription?.unsubscribe();

        if (country.id !== undefined) {
          this.removeCountrySubscription = this.countryServices
            .removeCountry(country.id)
            .subscribe(() => {
              this.countryListSubscription.unsubscribe();
              this.countryListSubscription = this.countryList$.subscribe((countries) => {
                this.countryList = countries;
              });
            });
        }
      }
    });
  }
}
@Component({
  selector: 'delete-country-dialog',
  templateUrl: './delete-country-dialog.html',
})
export class DeleteCountryDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ICountry) {}
}

