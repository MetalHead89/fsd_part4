import { boundMethod } from 'autobind-decorator';
import Observer from '../../../simple-js-slider/observer/Observer';
import { IRadioParams, PanelControlEvents } from '../../interfaces';

class RadioButton extends Observer<PanelControlEvents> {
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
    const checkedRadio = this.radios.find((radio) => radio.checked);
    return checkedRadio !== undefined ? checkedRadio.value : '';
  }

  switchTo(value: string): void {
    this.radios.forEach((radio) => {
      if (radio.value === value && !radio.checked) {
        radio.checked = true;
        this.handleRadioButtonChange();
      }
    });
  }

  private init(name: string, params: IRadioParams[]) {
    params.forEach(({ labelText, value, checked }: IRadioParams, index: number) => {
      const radioWrapper = document.createElement('div');
      radioWrapper.classList.add('radio-button__radio-wrapper');

      const label = document.createElement('label');
      label.classList.add('radio-button__label');
      label.innerText = labelText;

      const radioButton = document.createElement('input');
      radioButton.type = 'radio';
      radioButton.name = name;
      radioButton.value = value;
      radioButton.checked = index === 0 || Boolean(checked);
      radioButton.classList.add('radio-button__radio-button');
      radioButton.addEventListener('change', this.handleRadioButtonChange);
      this.radios.push(radioButton);

      label.append(radioButton);
      radioWrapper.append(label);
      this.control.append(radioWrapper);

      this.handleRadioButtonChange();
    });
  }

  @boundMethod
  private handleRadioButtonChange(): void {
    this.radios.forEach((radio) => {
      const label = radio.parentElement;

      if (radio.checked) {
        label?.classList.add('radio-button__label_checked');
      } else {
        label?.classList.remove('radio-button__label_checked');
      }
    });

    this.notify('PanelControlIsUpdated', '');
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
