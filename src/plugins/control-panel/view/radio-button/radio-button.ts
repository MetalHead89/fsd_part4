/* eslint-disable comma-dangle */

import Subject from '../../../simple-slider/subject/subject';
import { IRadioParams } from '../../interfaces';

class RadioButton extends Subject {
  private control: HTMLDivElement;
  private radios: HTMLInputElement[];

  constructor(name: string, ...params: IRadioParams[]) {
    super();
    const uniqueName = RadioButton.generateName(name);
    this.control = document.createElement('div');
    this.control.classList.add('radio-button');
    this.radios = [];

    this.init(uniqueName, params);
  }

  getControl(): HTMLDivElement {
    return this.control;
  }

  getValue(): string {
    for (let radio = 0; radio < this.radios.length; radio += 1) {
      if (this.radios[radio].checked) {
        return this.radios[radio].value;
      }
    }
    return '';
  }

  private init(name: string, params: IRadioParams[]) {
    for (let radio = 0; radio < params.length; radio += 1) {
      const radioWrapper = document.createElement('div');
      radioWrapper.classList.add('radio-button__radio-wrapper');

      const label = document.createElement('label');
      label.classList.add('radio-button__label');
      label.innerText = params[radio].label;

      const radioButton = document.createElement('input');
      radioButton.type = 'radio';
      radioButton.name = name;
      radioButton.value = params[radio].value;
      if (RadioButton.radioIsFirstOrChecked(radio, params[radio].checked)) {
        radioButton.checked = true;
      }
      radioButton.classList.add('radio-button__radio-button');
      radioButton.addEventListener('change', this.onChange.bind(this));
      this.radios.push(radioButton);

      label.append(radioButton);
      radioWrapper.append(label);
      this.control.append(radioWrapper);
    }
  }

  private static radioIsFirstOrChecked(
    index: number,
    checked: boolean | undefined,
  ) {
    return index === 0 || checked;
  }

  private onChange(): void {
    for (let radio = 0; radio < this.radios.length; radio += 1) {
      const label = this.radios[radio].parentElement;

      if (this.radios[radio].checked) {
        label?.classList.add('radio-button__label_checked');
      } else {
        label?.classList.remove('radio-button__label_checked');
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

export default RadioButton;
