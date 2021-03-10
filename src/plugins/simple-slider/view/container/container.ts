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
}
