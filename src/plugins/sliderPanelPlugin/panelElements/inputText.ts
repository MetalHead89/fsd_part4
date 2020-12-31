import { IInputControl } from '../interfaces';

import PanelElement from './panelElement';

class InputText extends PanelElement {
  private control: HTMLDivElement;

  constructor(input: HTMLInputElement, lblText: string, idPrefix: string) {
    super();

    const controlParams: IInputControl = {
      inputElement: input,
      id: this.generateID(idPrefix),
      inputType: 'text',
      inputClass: 'slider-panel__input',
      labelText: lblText,
      labelClass: 'slider-panel__input-text-label',
      wrapperClass: 'slider-panel__input-text-wrapper',
    };

    this.control = this.createControl(controlParams);
  }

  getControl(): HTMLDivElement {
    return this.control;
  }
}

export default InputText;
