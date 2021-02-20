export default class Container {
  private element: HTMLDivElement;
  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('control-panel');
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  append(control: HTMLDivElement): void {
    this.element.append(control);
  }
}
