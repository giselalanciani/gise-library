import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from './password-match.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    gender: ['', [Validators.required]],
    birthday: ['', [Validators.required]],
    phoneType: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    countryOfResidence: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    repeatPassword: [''],
  });

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
    }
  }

  hasFieldError(fieldName: string, validationName: string): boolean {
    return this.form.controls[fieldName].hasError(validationName);
  }
}
