import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesRoutingModule } from './countries-routing.module';
import { CountriesComponent, DeleteCountryDialog } from './countries/countries.component';
import { SharedModule } from '../shared/shared.module';
import { CountryDetailsComponent } from './country-details/country-details.component';


@NgModule({
  declarations: [
    CountriesComponent,
    DeleteCountryDialog,
    CountryDetailsComponent
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    SharedModule
  ]
})
export class CountriesModule { }
