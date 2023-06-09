import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICountry } from '../models';
import { CountriesService } from '../services/countries.service';

@Component({
  selector: 'app-country-details-v3',
  templateUrl: './country-details-v3.component.html',
  styleUrls: ['./country-details-v3.component.scss'],
})
export class CountryDetailsComponentV3 implements OnDestroy {
  country: ICountry | null = null;

  getCountrySubscription!: Subscription;
  editCountrySubscription!: Subscription;
  createCountrySubscription!: Subscription;

  form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
  });
  constructor(
    public countryServices: CountriesService,
    private activatedRouteService: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.getCountrySubscription = this.activatedRouteService.data.subscribe(
      (data) => {
        this.country = data['country'];
        if (this.country !== null) {
          this.form.controls['name'].setValue(this.country.name);
        }
      }
    );
  }
  ngOnDestroy(): void {
    this.getCountrySubscription?.unsubscribe();
    this.editCountrySubscription?.unsubscribe();
    this.createCountrySubscription?.unsubscribe();
  }
  onSubmit() {
    if (this.form.valid === true) {
      const country: ICountry = {
        name: this.form.controls['name'].value,
        id: '',
      };

      if (this.country === null) {
        this.createCountrySubscription?.unsubscribe();
        this.createCountrySubscription = this.countryServices
          .createCountry(country)
          .subscribe(() => {
            this.snackBar.open('El país fue guardado', 'ok');
            this.router.navigate(['countries']);
          });
      } else {
        this.editCountrySubscription?.unsubscribe();
        this.editCountrySubscription = this.countryServices
          .editCountry(this.country.id, country)
          .subscribe(() => {
            this.snackBar.open('El país fue actualizado', 'ok');
            this.router.navigate(['countries']);
          });
      }
    }
  }

  hasFieldError(fieldName: string, validationName: string): boolean {
    return this.form.controls[fieldName].hasError(validationName);
  }
}
