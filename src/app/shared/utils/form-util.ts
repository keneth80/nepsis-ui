import { FormGroup } from '@angular/forms';

export function ConfirmValidator(targetField: string, compareField: string){
  return (formGroup: FormGroup) => {
    const targetItem = formGroup.controls[targetField];
    const compareItem = formGroup.controls[compareField];
    if (compareItem.errors && !compareItem.errors.confirmValidator) {
      return;
    }
    if (targetItem.value !== compareItem.value) {
      compareItem.setErrors({ confirmValidator: true });
    } else {
      compareItem.setErrors(null);
    }
  };
}

export const validateAllFormFields = (formGroup: FormGroup) => {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    control?.markAsTouched({ onlySelf: true });
  });
}
