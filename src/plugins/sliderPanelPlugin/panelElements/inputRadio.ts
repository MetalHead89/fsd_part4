import { IInputControl } from '../interfaces'
import { IRadioParams } from '../interfaces'

import PanelElement from "./panelElement";

class InputRadio extends PanelElement {

    private control: HTMLDivElement;

    constructor(radioParams: IRadioParams[], namePprefix: string) {
        super();
        const name = this.generateName(namePprefix);

        const wrapper: HTMLDivElement = document.createElement('div');
        wrapper.className = 'slider-panel__radio-group';

        for (const params of radioParams) {

            const controlParams: IInputControl = {
                'inputElement': document.createElement('input'),
                'id': this.generateID(params.id),
                'name': name,
                'value': params.value,
                'inputType': 'radio',
                'inputClass': 'slider-panel__radio-button',
                'labelText': params.label,
                'labelClass': 'slider-panel__input-radio-label',
                'wrapperClass': 'slider-panel__input-radio-wrapper'
            }

            const wrappedRadio: HTMLDivElement = this.createControl(controlParams);
            wrapper.append(wrappedRadio);
        }

        this.control = wrapper;
    }

    getControl() {
        return this.control;
    }

}

export default InputRadio;