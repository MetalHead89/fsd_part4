export interface IInputControl {
    'control': HTMLInputElement,
    'id'?: string,
    'name'?: string,
    'value'?: string,
    'controlType': string,
    'controlClass': string,
    'labelText': string,
    'labelClass': string,
    'wrapperClass': string
}

export interface IRadioParams { 
    'control': HTMLInputElement,
    'id': string,
    'label': string,
    'value': string
}