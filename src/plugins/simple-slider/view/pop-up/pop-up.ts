import { IPopUpParams, IPosition } from '../../interfaces';
import UIControl from '../ui-control/ui-control';

class PopUp extends UIControl {
  constructor(orientation?: string) {
    super('pop-up', orientation);
  }

  update(params: IPopUpParams): void {
    this.updateValue(params.value);
    this.updatePosition(params.position);
  }

  private updateValue(value: number): void {
    this.control.innerHTML = `${value}`;
  }

  private updatePosition(position: IPosition): void {
    this.control.style.left = `${position.left}px`;
    this.control.style.top = `${position.top}px`;
  }
}

export default PopUp;
