import { IPopUpParams, IPosition } from '../../interfaces';
import Element from '../element/element';

class PopUp extends Element {
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
    this.element.innerHTML = `${value}`;
  }

  /**
   * Обновляет позицию всплывающей подсказки
   * @param {IPosition} position - объект с новой позицией всплывающей подсказки
   */
  private updatePosition(position: IPosition): void {
    this.element.style.left = `${position.left}px`;
    this.element.style.top = `${position.top}px`;
  }
}

export default PopUp;
