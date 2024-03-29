import { FormGroup, FormArray, FormControl } from '@angular/forms';

export class FormGroupHelper {
    static disabledProps: Array<string>;
    static mapFormGroupToObject<T>(formGroup: FormGroup, type: new () => T) {
        let obj = this.createEntity(type);
        obj = formGroup.getRawValue();
        return obj as T;
    }

    static setDisabledProps(props: Array<string>) {
        this.disabledProps = props;
    }

    static async mapObjectToFormGroup(obj: any, formGroup: FormGroup, parentName: string = null) {
        if (!obj) {
            return;
        }
        Object.keys(obj).forEach(p => {
            if (formGroup.get(p) != null) {
                formGroup.get(p).enable({onlySelf: true});
            }
            if (obj[p] instanceof Array) {
                const formArray = formGroup.get(p) as FormArray;
                obj[p].forEach(child => {
                    formArray.push(this.getFormGroup(child));
                    this.mapObjectToFormGroup(child, formArray.at(obj[p].indexOf(child)) as FormGroup, p);
                });
            } else if (formGroup.contains(p)) {
                if (formGroup.get(p) instanceof FormGroup) {
                    this.mapObjectToFormGroup(obj[p], formGroup.get(p) as FormGroup, p);
                } else {
                    const nodePath = parentName ? parentName + '.' + p : p;
                    formGroup.get(p).setValue(obj[p]);
                    if (this.disabledProps && this.disabledProps.includes(nodePath)) {
                        formGroup.get(p).disable({onlySelf: true});
                    }
                }
            }
        });
    }

    static async mapArrayToFormArray(objs: Array<any>, formArray: FormArray, parentName: string = null) {
        formArray.clear();
        objs.forEach(obj => {
            formArray.push(this.getFormGroup(obj));
            this.mapObjectToFormGroup(obj, formArray.at(objs.indexOf(obj)) as FormGroup, parentName);
        });
    }

    static createEntity<T>(type: new () => T): T {
        return new type();
    }

    // tslint:disable-next-line:variable-name
    static getFormGroup(obj: any, _formGroup: FormGroup = null) {
        const formGroup = _formGroup ? _formGroup : new FormGroup({});
        Object.keys(obj).forEach(p => {
            if (obj[p] != null) {
                let formControl = null;
                if (Object.keys(obj[p]).length > 0 && !(obj[p] instanceof Array) && (typeof obj[p] !== 'string')) {
                    formControl = new FormGroup({});
                    this.getFormGroup(obj[p], formControl);
                } else {
                    formControl = new FormControl();
                }
                formGroup.addControl(p, formControl);
            }
        });
        return formGroup;
    }
}
