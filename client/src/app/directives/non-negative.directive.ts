import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { nonNegativeValidator } from '../utils/non-negative.validator';

@Directive({
  selector: '[appNonNegative]',
  standalone: true,
  providers: [{
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: NonNegativeDirective
  }]
})
export class NonNegativeDirective implements Validator{

  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    const valdiatorFn = nonNegativeValidator();
    return valdiatorFn(control);
  }

}
