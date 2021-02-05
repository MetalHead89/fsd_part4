import { ISize } from '../../interfaces';

class Container {
  element: HTMLDivElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('slider', 'slider_horizontal');
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
