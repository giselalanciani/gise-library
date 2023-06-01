import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesV2Component } from './countries-v2/countries-v2.component';
import { CountriesV3Component } from './countries-v3/countries-v3.component';
import { CountriesResolver } from './resolver/getCountries.resolver';
import { CountriesComponent } from './countries/countries.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { CountryDetailsComponentV3 } from './country-details-v3/country-details-v3.component';
import { GetCountryResolver } from './resolver/getCountry.resolver';

const routes: Routes = [
  {
    path: '',
    component: CountriesComponent,
  },
  { path: 'create', component: CountryDetailsComponent },
  { path: ':id/edit', component: CountryDetailsComponent },
  { path: 'v2', component: CountriesV2Component },
  {
    path: 'v3',
    component: CountriesV3Component,
    resolve: {
      countriesList: CountriesResolver,
    },
  },
  {
    path: 'create-v3',
    component: CountryDetailsComponentV3,
    resolve: {
      country: GetCountryResolver,
    },
  },
  {
    path: ':id/edit-v3',
    component: CountryDetailsComponentV3,
    resolve: {
      country: GetCountryResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountriesRoutingModule {}
