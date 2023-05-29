import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesRoutingModule } from './countries-routing.module';
import {
  CountriesComponent,
  DeleteCountryDialog,
} from './countries/countries.component';
import { SharedModule } from '../shared/shared.module';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { CountriesV2Component } from './countries-v2/countries-v2.component';
import { CountriesV3Component } from './countries-v3/countries-v3.component';

@NgModule({
  declarations: [
    CountriesComponent,
    DeleteCountryDialog,
    CountryDetailsComponent,
    CountriesV2Component,
    CountriesV3Component,
  ],
  imports: [CommonModule, CountriesRoutingModule, SharedModule],
})
export class CountriesModule {}
