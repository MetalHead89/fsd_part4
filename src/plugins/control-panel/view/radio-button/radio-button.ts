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
    let value = '';

    this.radios.forEach((radio) => {
      if (radio.checked) {
        value = radio.value;
      }
    });

    return value;
  }

  switchTo(value: string): void {
    this.radios.forEach((radio) => {
      if (radio.value === value) {
        radio.checked = true;
        this.handleRadioButtonChange();
      }
    });
  }

  private init(name: string, params: IRadioParams[]) {
    params.forEach(
      ({ labelText, value, checked }: IRadioParams, index: number) => {
        const radioWrapper = document.createElement('div');
        radioWrapper.classList.add('radio-button__radio-wrapper');

        const label = document.createElement('label');
        label.classList.add('radio-button__label');
        label.innerText = labelText;

        const radioButton = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.name = name;
        radioButton.value = value;
        if (index === 0 || checked) {
          radioButton.checked = true;
        }
        radioButton.classList.add('radio-button__radio-button');
        this.handleRadioButtonChange = this.handleRadioButtonChange.bind(this);
        radioButton.addEventListener('change', this.handleRadioButtonChange);
        this.radios.push(radioButton);

        label.append(radioButton);
        radioWrapper.append(label);
        this.control.append(radioWrapper);
      }
    );
  }

  private handleRadioButtonChange(): void {
    this.radios.forEach((radio) => {
      const label = radio.parentElement;

      if (radio.checked) {
        label?.classList.add('radio-button__label_checked');
      } else {
        label?.classList.remove('radio-button__label_checked');
      }
    });

    this.notify('controlPanelDataUpdated');
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
