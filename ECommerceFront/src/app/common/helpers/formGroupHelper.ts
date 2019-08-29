import { FormGroup, FormArray, FormControl } from '@angular/forms';

export class FormGroupHelper {
    formGroup: FormGroup;

    static mapFormGroupToObject<T>(formGroup: FormGroup, type: new () => T) {
        let obj = this.createEntity(type);
        obj = formGroup.getRawValue();
        return obj as T;
    }

    static async mapObjectToFormGroup<T>(obj: any, formGroup: FormGroup) {
        Object.keys(obj).forEach(p => {
            if (obj[p] instanceof Array) {
                obj[p].forEach(child => {
                    const formArray = formGroup.get(p) as FormArray;
                    formArray.push(this.getFormGroup(child));
                });
            } else if (formGroup.contains(p)) {
                if (formGroup.get(p) instanceof FormGroup) {
                    Object.keys(obj[p]).forEach(child => {
                        if (formGroup.get(p).get(child)) {
                            formGroup.get(p).get(child).setValue(obj[p][child]);
                        }
                    });
                } else {
                    formGroup.get(p).setValue(obj[p]);
                }
            }
        });
        return formGroup;
    }

    static createEntity<T>(type: new () => T): T {
        return new type();
    }

    static getFormGroup(obj: any) {
        const formGroup = new FormGroup({});
        Object.keys(obj).forEach(p => {
            const formControl = new FormControl(obj[p]);
            formGroup.addControl(p, formControl);
        });
        return formGroup;
    }
}
