import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const isCheckValidValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  console.log('control.value', control.value);
  if (true === control.value) {
    return null;
  } else {
    return {
      isCheckValid: {
        checkedValue: control.value,
      },
    };
  }
};

export { isCheckValidValidator };
