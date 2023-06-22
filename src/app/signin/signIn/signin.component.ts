import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private formBuilder: FormBuilder) {}

  onSubmit() {
    if (this.form.valid) {
      const email = this.form.controls['email'].value;
      const password = this.form.controls['password'].value;
    }
  }

  hasFieldError(fieldName: string, validationName: string): boolean {
    return this.form.controls[fieldName].hasError(validationName);
  }
}
