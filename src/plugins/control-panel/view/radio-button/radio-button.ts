import Subject from '../../../simple-slider/subject/subject';
import { IRadioParams } from '../../interfaces';

export default class RadioButton extends Subject {
  private control: HTMLDivElement;
  private radios: HTMLInputElement[];

  constructor(name: string, ...params: IRadioParams[]) {
    super();
    const uniqueName = RadioButton.generateName(name);
    this.control = document.createElement('div');
    this.control.classList.add('control-panel__radio-group');
    this.radios = [];

    this.init(uniqueName, params);
  }

  getControl(): HTMLDivElement {
    return this.control;
  }

  getValue(): string {
    let value = '';
    for (let radio = 0; radio < this.radios.length; radio += 1) {
      if (this.radios[radio].checked) {
        value = this.radios[radio].value;
        break;
      }
    }
    return value;
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

    this.notify('controlPanelDataUpdated');
  }

  switchTo(value: string): void {
    for (let radio = 0; radio < this.radios.length; radio += 1) {
      if (this.radios[radio].value === value) {
        this.radios[radio].checked = true;
        this.onChange();
        break;
      }
    }
  }

  private static generateName(name: string): string {
    let counter = 1;
    let uniqueName = '';

    while (uniqueName === '') {
      const newName = `${name}${counter}`;
      if (document.querySelector(`[name="${newName}"]`) === null) {
        uniqueName = newName;
      }
      counter += 1;
    }

    return uniqueName;
  }
}
