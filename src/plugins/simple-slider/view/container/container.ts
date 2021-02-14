import { ISize } from '../../interfaces';

class Container {
  private element: HTMLDivElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('slider', 'slider_horizontal');
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  getSize(): ISize {
    return {
      width: this.element.offsetWidth,
      height: this.element.offsetHeight,
    };
  }

  append(control: HTMLDivElement): void {
    this.element.append(control);
  }
}

export default Container;
