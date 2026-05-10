import { ValidatorFn } from "@angular/forms";

export function nonNegativeValidator():ValidatorFn{
    return (control) => {
        const isInvalid = Number(control.value) > 0;
        return isInvalid ? null :{nonNegativeValidator: true};
    }
}
