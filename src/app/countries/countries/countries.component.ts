import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  countryList = new MatTableDataSource<ICountry>([]);
  countryListSubscription!: Subscription;
  removeCountrySubscription!: Subscription;
  dialogDeleteSubscription! : Subscription;

  columnsToDisplay = ['name', 'actions'];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(public countryServices: CountriesService, public dialogService: MatDialog) {
    this.countryList$ = this.countryServices.getCountries();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.countryList.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit(): void {
    this.countryListSubscription = this.countryList$.subscribe((countries) => {
      this.countryList.data = countries;
    });
  }
  ngAfterViewInit() {
    this.countryList.sort = this.sort;
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
                this.countryList.data = countries;
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

