import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(
  dependentControl: AbstractControl
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (dependentControl.value === control.value) {
      return null;
    } else {
      return {
        passwordMatch: {
          typedValue: control.value,
          dependentValue: dependentControl.value,
        },
      };
    }
  };
}
