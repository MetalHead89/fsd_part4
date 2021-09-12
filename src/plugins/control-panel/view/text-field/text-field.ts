import Subject from '../../../simple-slider/subject/subject';

class TextField extends Subject {
  private control: HTMLDivElement;
  private field: HTMLInputElement;
  private label: HTMLLabelElement;

  constructor(labelText: string) {
    super();
    this.control = document.createElement('div');
    this.field = document.createElement('input');
    this.label = document.createElement('label');

    this.init(labelText);
  }

  getControl(): HTMLDivElement {
    return this.control;
  }

  getValue(): number {
    return parseInt(this.field.value, 10);
  }

  setValue(value: number): void {
    this.field.value = `${value}`;
  }

  private init(labelText: string) {
    this.control.classList.add('text-field');

    this.field.type = 'number';
    this.field.classList.add('text-field__input');
    this.handleTextFieldBlur = this.handleTextFieldBlur.bind(this);
    this.field.addEventListener('blur', this.handleTextFieldBlur);
    this.field.onkeypress = TextField.removeNonDigitChar;

    this.label.classList.add('text-field__label');
    this.label.innerText = labelText;
    this.label.append(this.field);

    this.control.append(this.label);
  }

  private handleTextFieldBlur() {
    this.notify('controlPanelDataUpdated');
  }

  /**
   * Удаляет из текстового поля символы, не являющиеся цифрами
   * @param {KeyboardEvent} event - событие клавиатуры
   */
  private static removeNonDigitChar(event: KeyboardEvent): boolean {
    return /[-\d]/.test(event.key);
  }
}

export default TextField;
