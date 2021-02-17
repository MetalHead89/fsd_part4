import { IPopUpParams, IPosition } from '../../interfaces';
import Element from '../element/element';

class PopUp extends Element {
  constructor() {
    super();
    this.element.classList.add('slider__pop-up', 'slider__pop-up_horizontal');
  }

  update(params: IPopUpParams): void {
    this.updateValue(params.value);
    this.updatePosition(params.position);
  }

  private updateValue(value: number): void {
    this.element.innerHTML = `${value}`;
  }

  private updatePosition(position: IPosition): void {
    this.element.style.left = `${position.left}px`;
    this.element.style.top = `${position.top}px`;
  }
}

export default PopUp;
