import {IInputControl} from '../interfaces'

import PanelElement from "./panelElement";

class InputCheckbox extends PanelElement{

    private control: HTMLDivElement;

    constructor(input: HTMLInputElement, labelText: string, idPrefix: string) {
        super();      
    
            const controlParams: IInputControl = {
                'inputElement': input,
                'id': this.generateID(idPrefix),
                'inputType': 'checkbox',
                'inputClass': 'slider-panel__checkbox',
                'labelText': labelText,
                'labelClass': 'slider-panel__input-checkbox-label',
                'wrapperClass': 'slider-panel__input-checkbox-wrapper'
            }
    
            this.control = this.createControl(controlParams);
    }

    getControl() {
        return this.control;
    }

}

export default InputCheckbox