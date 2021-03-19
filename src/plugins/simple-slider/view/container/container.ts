import { ISliderMargins } from '../../interfaces';
import Element from '../element/element';

class Container extends Element {
  constructor() {
    super('slider');
  }

  /**
   * Добавляет принятый div элемент в конец контейнера
   * @param {HTMLDivElement} control - div элемент, который должен быть добавлен в контейнер
   */
  append(control: HTMLDivElement): void {
    this.element.append(control);
  }

  /**
   * Устанавливает отступы от левой, верхней, правой и нижней границ слайдера
   * @param {ISliderMargins} margins - объект с отступами от левой, верхней, правой
   * и нижней границ слайдера
   */
  setMargins(margins: ISliderMargins): void {
    this.element.style.marginLeft = `${margins.left}px`;
    this.element.style.marginTop = `${margins.top}px`;
    this.element.style.marginRight = `${margins.right}px`;
    this.element.style.marginBottom = `${margins.bottom}px`;
  }

  /**
   * Сбрасывает отступы от границ слайдера на 0
   */
  resetMargins(): void {
    this.element.style.margin = '0';
  }
}

export default Container;
