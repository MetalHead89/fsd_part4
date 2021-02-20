export default class Container {
  private element: HTMLDivElement;
  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('slider', 'slider_horizontal');
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  append(control: HTMLDivElement): void {
    this.element.append(control);
  }
}
