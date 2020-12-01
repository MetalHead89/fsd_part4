import {IInputControl} from '../interfaces'

import PanelElement from "./panelElement";

class InputCheckbox extends PanelElement{

    private control: HTMLDivElement;

    constructor(labelText: string, idPrefix: string) {
        super();
        const checkbox = document.createElement('input');        
    
            const controlParams: IInputControl = {
                'inputElement': document.createElement('input'),
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