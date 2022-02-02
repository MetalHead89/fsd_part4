import { boundMethod } from 'autobind-decorator';
import Observer from '../../../simple-js-slider/observer/Observer';
import { PanelControlEvents } from '../../interfaces';

class TextField extends Observer<PanelControlEvents> {
  private control: HTMLDivElement;
  private field: HTMLInputElement;
  private label: HTMLLabelElement;
  private value: number;

  constructor(labelText: string) {
    super();
    this.control = document.createElement('div');
    this.field = document.createElement('input');
    this.label = document.createElement('label');
    this.value = 0;

    this.init(labelText);
  }

  getControl(): HTMLDivElement {
    return this.control;
  }

  getValue(): number {
    return this.value;
  }

  setValue(value: number): void {
    this.value = value;
    this.field.value = `${value}`;
  }

  private init(labelText: string) {
    this.control.classList.add('text-field');

    this.field.type = 'number';
    this.field.classList.add('text-field__input');
    this.field.addEventListener('blur', this.handleTextFieldBlur);
    this.field.addEventListener('keyup', this.handleTextFieldKeyup);
    this.field.addEventListener('keypress', TextField.removeNonDigitChar);

    this.label.classList.add('text-field__label');
    this.label.innerText = labelText;
    this.label.append(this.field);

    this.control.append(this.label);
  }

  @boundMethod
  private handleTextFieldBlur() {
    this.changeText();
  }

  @boundMethod
  private handleTextFieldKeyup(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.changeText();
    }
  }

  @boundMethod
  private changeText() {
    if (this.field.value === '') {
      this.field.value = this.value.toString();
    } else {
      this.value = parseInt(this.field.value, 10);
      this.notify('panelControlIsUpdated', '');
    }
  }

  private static removeNonDigitChar(event: KeyboardEvent): boolean {
    return /[-\d]/.test(event.key);
  }
}

export default TextField;
