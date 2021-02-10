import { IPopUpParams, IPosition } from '../../interfaces';

class PopUp {
  private element: HTMLDivElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('slider__pop-up', 'slider__pop-up_horizontal');
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  update(params: IPopUpParams): void {
    this.updateValue(params.value);
    this.updatePosition(params.position);
  }

  updateValue(value: number): void {
    this.element.innerHTML = `${value}`;
  }

  updatePosition(position: IPosition): void {
    this.element.style.left = `${position.left}px`;
    this.element.style.top = `${position.top}px`;
  }
}

export default PopUp;
