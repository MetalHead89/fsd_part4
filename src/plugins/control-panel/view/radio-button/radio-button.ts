import { IRadioParams } from '../../interfaces';

export default class RadioButton {
  private control: HTMLDivElement;

  constructor(name: string, ...params: IRadioParams[]) {
    this.control = document.createElement('div');
    this.control.classList.add('slider-panel__radio-group');

    for (let radio = 0; radio < params.length; radio += 1) {
      const radioWrapper = document.createElement('div');
      radioWrapper.classList.add('slider-panel__input-radio-wrapper');

      const radioButton = document.createElement('input');
      radioButton.type = 'radio';
      radioButton.name = name;
      radioButton.value = params[radio].value;
      radioButton.classList.add('slider-panel__radio-button');

      const label = document.createElement('label');
      label.classList.add('slider-panel__radio-label');
      label.innerText = params[radio].label;
      label.append(radioButton);

      radioWrapper.append(label);
      this.control.append(radioWrapper);
    }
  }

  getControl(): HTMLDivElement {
    return this.control;
  }
}
