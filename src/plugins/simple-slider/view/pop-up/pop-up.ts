import { IPopUpParams, IPosition } from '../../interfaces';
import UIControl from '../ui-control/ui-control';

class PopUp extends UIControl {
  constructor(orientation?: string) {
    super('pop-up', orientation);
  }

  /**
   * Обновляет позицию всплывающей подсказки и её значение
   * @param {IPopUpParams} params - объект с новой позицией и значением всплывающей подсказки
   */
  update(params: IPopUpParams): void {
    this.updateValue(params.value);
    this.updatePosition(params.position);
  }

  /**
   * Обновляет значение всплывающей подсказки
   * @param {number} value - новое значение всплывающей подсказки
   */
  private updateValue(value: number): void {
    this.control.innerHTML = `${value}`;
  }

  /**
   * Обновляет позицию всплывающей подсказки
   * @param {IPosition} position - объект с новой позицией всплывающей подсказки
   */
  private updatePosition(position: IPosition): void {
    this.control.style.left = `${position.left}px`;
    this.control.style.top = `${position.top}px`;
  }
}

export default PopUp;
