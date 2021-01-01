export interface IInputControl {
    'inputElement': HTMLInputElement,
    'id'?: string,
    'name'?: string,
    'value'?: string,
    'inputType': string,
    'inputClass': string,
    'labelText': string,
    'labelClass': string,
    'wrapperClass': string
}

export interface IRadioParams {
    'input': HTMLInputElement
    'id': string,
    'label': string,
    'value': string
}
