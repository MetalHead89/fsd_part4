import { ISliderMargins } from '../../interfaces';
import UIControl from '../ui-control/ui-control';

class Slider extends UIControl {
  constructor() {
    super('slider');
  }

  /**
   * Добавляет принятый div элемент в конец контейнера
   * @param {HTMLDivElement} control - div элемент, который должен быть добавлен в контейнер
   */
  append(control: HTMLDivElement): void {
    this.control.append(control);
  }

  setMargins(margins: ISliderMargins): void {
    this.control.style.marginLeft = `${margins.left}px`;
    this.control.style.marginTop = `${margins.top}px`;
    this.control.style.marginRight = `${margins.right}px`;
    this.control.style.marginBottom = `${margins.bottom}px`;
  }

  resetMargins(): void {
    this.control.style.margin = '0';
  }
}

export default Slider;
