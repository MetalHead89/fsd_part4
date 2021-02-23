import Subject from '../../../simple-slider/subject/subject';

export default class TextField extends Subject {
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
    this.control.classList.add('slider-panel__text-field-control');

    this.field.classList.add('control-panel__text-field');
    this.field.addEventListener('blur', this.reportChanges.bind(this));
    this.field.onkeypress = this.removeNonDigitChar;

    this.label.classList.add('slider-panel__text-field-label');
    this.label.innerText = labelText;
    this.label.append(this.field);

    this.control.append(this.label);
  }

  private reportChanges() {
    this.notify('thumbValuesIsUpdated');
  }

  private removeNonDigitChar(event: KeyboardEvent): boolean {
    return /^\-?\d+/.test(event.key);
  }
}
