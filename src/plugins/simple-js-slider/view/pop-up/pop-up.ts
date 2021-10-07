import { IPopUpParams, IPosition } from '../../interfaces';
import UIControl from '../ui-control/ui-control';

class PopUp extends UIControl {
  constructor(orientation?: string) {
    super('pop-up', orientation);
  }

  update({ value, position }: IPopUpParams): void {
    this.updateValue(value);
    this.updatePosition(position);
  }

  private updateValue(value: number): void {
    this.control.innerHTML = `${value}`;
  }

  private updatePosition({ left, top }: IPosition): void {
    this.control.style.left = `${left}px`;
    this.control.style.top = `${top}px`;
  }
}

export default PopUp;
