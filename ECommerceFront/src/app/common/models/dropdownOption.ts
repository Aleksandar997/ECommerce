export class DropdownOption {
    code: string;
    value: string;
    // tslint:disable-next-line:variable-name
    constructor(_code: string = null, _value: string = null) {
        this.code = _code;
        this.value = _value;
    }
}

export class DropdownGroup {
    name: string;
    dropdownOption: Array<DropdownOption>;

    constructor(name: string = null, dropdownOption: Array<DropdownOption> = new Array<DropdownOption>()) {
        this.name = name;
        this.dropdownOption = dropdownOption;
    }
}
