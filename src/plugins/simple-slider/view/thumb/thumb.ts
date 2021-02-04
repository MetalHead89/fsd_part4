import { IThumbPosition } from '../../interfaces';

class Thumb {
  private element: HTMLDivElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('slider__thumb', 'slider__thumb_horizontal');
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  moveTo(position: IThumbPosition): void {
    this.element.style.left = `${position.left}px`;
    this.element.style.top = `${position.top}px`;
  }
}

export default Thumb;
