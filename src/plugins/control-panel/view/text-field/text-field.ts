export default class TextField {
  private control: HTMLDivElement;
  private field: HTMLInputElement;
  private label: HTMLLabelElement;

  constructor(labelText: string) {
    this.control = document.createElement('div');
    this.control.classList.add('slider-panel__text-field-control');

    this.field = document.createElement('input');
    this.field.classList.add('control-panel__text-field');

    this.label = document.createElement('label');
    this.label.classList.add('slider-panel__text-field-label');
    this.label.innerText = labelText;
    this.label.append(this.field);

    this.control.append(this.label);
  }

  getControl(): HTMLDivElement {
    return this.control;
  }

  getValue(): string {
    return this.field.innerText;
  }
}
