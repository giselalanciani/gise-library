import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRegistration } from '../models';
import { isCheckValidValidator } from './is-checkbox-valid.validator';
import { passwordMatchValidator } from './password-match.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    firstName: ['Gisela', [Validators.required]],
    lastName: ['Lanciani', [Validators.required]],
    email: ['gise@gmail.com', [Validators.required, Validators.email]],
    gender: ['female', [Validators.required]],
    birthday: ['', [Validators.required]],
    phoneType: ['mobile', [Validators.required]],
    phoneNumber: ['23232323232', [Validators.required]],
    countryOfResidence: ['Argentina', [Validators.required]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
    repeatPassword: ['123456'],
    terms: [false, isCheckValidValidator],
    privacy: [false, isCheckValidValidator],
  });

  today = new Date();
  eighteenYearsAgo = new Date(
    this.today.getFullYear() - 18,
    this.today.getMonth(),
    this.today.getDate()
  );
  hundredYearsAgo = new Date(
    this.today.getFullYear() - 100,
    this.today.getMonth(),
    this.today.getDate()
  );
  wasSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form.controls['repeatPassword'].setValidators([
      Validators.required,
      passwordMatchValidator(this.form.controls['password']),
    ]);
  }

  validatePasswords(event: any) {
    console.log('correr validador de repeat');
    this.form.controls['repeatPassword'].updateValueAndValidity();
  }

  onSubmit() {
    this.wasSubmitted = true;
    if (this.form.valid) {
      const firstName = this.form.controls['firstName'].value;
      const lastName = this.form.controls['lastName'].value;
      const email = this.form.controls['email'].value;
      const gender = this.form.controls['gender'].value;
      const birthday = this.form.controls['birthday'].value;
      const phoneType = this.form.controls['phoneType'].value;
      const phoneNumber = this.form.controls['phoneNumber'].value;
      const countryOfResidence = this.form.controls['countryOfResidence'].value;
      const password = this.form.controls['password'].value;
      const repeatPassword = this.form.controls['repeatPassword'].value;
      const terms = this.form.controls['terms'].value;
      const privacy = this.form.controls['privacy'].value;

      const registration: IRegistration = {
        firstName,
        lastName,
        email,
        gender,
        birthday,
        phoneType,
        phoneNumber,
        countryOfResidence,
        password,
        repeatPassword,
        terms,
        privacy,
      };

      console.log('sending registration: ', registration);
    }
  }

  hasFieldError(fieldName: string, validationName: string): boolean {
    return this.form.controls[fieldName].hasError(validationName);
  }
}
