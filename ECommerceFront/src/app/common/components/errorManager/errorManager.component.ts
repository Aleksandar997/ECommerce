import { FormGroup, FormArray, AbstractControl } from '@angular/forms';

export abstract class ErrorManagerComponent {

    constructor() { }

    addErrors(errors, formGroup: FormGroup) {
        Object.keys(errors).forEach(prop => {
            const orginialProp = prop;
            prop = prop.firstCharToLower();
            const propDotSplit = prop.split('.');
            this.setNestedErrors(propDotSplit, formGroup, errors[orginialProp]);
            const formControl = formGroup.get(prop);
            this.setServerError(formControl, errors[orginialProp]);
        });
    }
    setNestedErrors(props: Array<string>, formGroup: FormGroup, error: string) {
        const prop = props.shift();
        let formControl = null;
        if (!prop.includes('[')) {
            if (!formGroup) {
                return;
            }
            formControl = formGroup.get(prop.firstCharToLower());
            if (props.length === 0) {
                this.setServerError(formControl, error);
                return;
            }
            this.setNestedErrors(props, formControl, error);
        } else {
            const propBracketSplit = prop.split('[');
            const index = propBracketSplit[1].split(']')[0];
            const formControlParent = formGroup.get(propBracketSplit[0]) as FormArray;
            this.setNestedErrors(props, formControlParent.controls[index], error);
        }
    }
    setServerError(formControl: FormArray | AbstractControl, msg: string) {
        if (formControl) {
            formControl.setErrors({
                serverError: msg
            });
        }
    }
}

