import { IRadioParams } from '../../interfaces';

export default class RadioButton {
  private control: HTMLDivElement;
  private radios: HTMLInputElement[];

  constructor(name: string, ...params: IRadioParams[]) {
    this.control = document.createElement('div');
    this.control.classList.add('control-panel__radio-group');
    this.radios = [];

    this.init(name, params);
  }

  getControl(): HTMLDivElement {
    return this.control;
  }

  private init(name: string, params: IRadioParams[]) {
    for (let radio = 0; radio < params.length; radio += 1) {
      const radioWrapper = document.createElement('div');
      radioWrapper.classList.add('control-panel__radio-wrapper');

      const label = document.createElement('label');
      label.classList.add('control-panel__radio-label');
      label.innerText = params[radio].label;

      const radioButton = document.createElement('input');
      radioButton.type = 'radio';
      radioButton.name = name;
      radioButton.value = params[radio].value;
      radioButton.classList.add('control-panel__radio-button');
      radioButton.addEventListener('change', this.onChange.bind(this));
      this.radios.push(radioButton);

      label.append(radioButton);
      radioWrapper.append(label);
      this.control.append(radioWrapper);
    }
  }

  private onChange(): void {
    for (let radio = 0; radio < this.radios.length; radio += 1) {
      const label = this.radios[radio].parentElement;

      if (this.radios[radio].checked) {
        label?.classList.add('control-panel__radio-label_checked');
      } else {
        label?.classList.remove('control-panel__radio-label_checked');
      }
    }
  }
}
