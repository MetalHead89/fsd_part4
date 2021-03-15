import { ISliderMargins } from '../../interfaces';
import Element from '../element/element';

export default class Container extends Element {
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

  setMargins(margins: ISliderMargins): void {
    this.element.style.marginLeft = `${margins.left}px`;
    this.element.style.marginTop = `${margins.top}px`;
    this.element.style.marginRight = `${margins.right}px`;
    this.element.style.marginBottom = `${margins.bottom}px`;
  }

  resetMargins(): void {
    this.element.style.margin = '0';
  }
}
