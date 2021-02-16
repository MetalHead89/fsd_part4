export default class Container {
  element: HTMLDivElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('slider');
  }

  append(element: HTMLDivElement): void {
    this.element.append(element);
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  getSize(): boolean {
    return true;
  }
}
