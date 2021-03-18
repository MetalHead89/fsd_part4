class Container {
  private element: HTMLDivElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('control-panel');
  }

  /**
   * Возвращает HTML элемент контейнера
   * @returns {HTMLDivElement} - div элемент
   */
  getElement(): HTMLDivElement {
    return this.element;
  }

  /**
   * Добавляет принятый div элемент в конец контейнера
   * @param {HTMLDivElement} control - div элемент, который должен быть добавлен в контейнер
   */
  append(control: HTMLDivElement): void {
    this.element.append(control);
  }

  /**
   * Переключает панель в горизонтальный режим
   */
  switchToHorizontal(): void {
    this.element.classList.remove('control-panel_vertical');
    this.element.classList.add('control-panel_horizontal');
  }

  /**
   * Переключает панель в вертикальный режим
   */
  switchToVertical(): void {
    this.element.classList.remove('control-panel_horizontal');
    this.element.classList.add('control-panel_vertical');
  }
}

export default Container;
