import { IPopUpParams, IPosition } from '../../interfaces';
import Element from '../element/element';

class PopUp extends Element {
  constructor(orientation?: string) {
    super();

    let orientationClass = 'slider__pop-up_horizontal';
    if (orientation) {
      orientationClass = `slider__pop-up_${orientation}`;
    }
    this.element.classList.add('slider__pop-up', orientationClass);
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
