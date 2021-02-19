export default class InputText {
  private element: HTMLDivElement;
  private label: string;

  constructor(label: string) {
    this.element = document.createElement('div');
    this.element.classList.add('control-panel__text-field');
    this.label = label;
  }

  getValue(): string {
    return this.element.innerText;
  }
}
