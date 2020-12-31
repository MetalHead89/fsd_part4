import { IInputControl, IRadioParams } from '../interfaces';

import PanelElement from './panelElement';

class InputRadio extends PanelElement {
  private control: HTMLDivElement;

  constructor(radioParams: IRadioParams[], namePprefix: string) {
    super();
    const nameValue = this.generateName(namePprefix);

    const wrapper: HTMLDivElement = document.createElement('div');
    wrapper.className = 'slider-panel__radio-group';

    for (let paramsIndex = 0; paramsIndex < radioParams.length; paramsIndex += 1) {
      const params = radioParams[paramsIndex];

      const controlParams: IInputControl = {
        inputElement: params.input,
        id: this.generateID(params.id),
        name: nameValue,
        value: params.value,
        inputType: 'radio',
        inputClass: 'slider-panel__radio-button',
        labelText: params.label,
        labelClass: 'slider-panel__input-radio-label',
        wrapperClass: 'slider-panel__input-radio-wrapper',
      };

      const wrappedRadio: HTMLDivElement = this.createControl(controlParams);
      wrapper.append(wrappedRadio);
    }

    this.control = wrapper;
  }

  getControl(): HTMLDivElement {
    return this.control;
  }
}

export default InputRadio;
