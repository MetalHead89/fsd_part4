import { IPosition, ISize } from '../../interfaces';
import Subject from '../../subject/subject';

class UIControl {
  protected control: HTMLDivElement;
  protected lastPosition: IPosition;
  subject: Subject;

  constructor(name: string, orientation?: string) {
    const control = document.createElement('div');
    this.control = control;
    this.subject = new Subject();
    this.lastPosition = { left: 0, top: 0 };

    let orientationClass = `${name}_horizontal`;
    if (orientation) {
      orientationClass = `${name}_${orientation}`;
    }
    this.control.classList.add(`${name}`, orientationClass);
  }

  /**
   * Сохраняет позицию курсора относительно левого и верхнего края родительского контейнера
   * @param {IPosition} cursorPosition - объект с позицией курсора
   * относительно левого и верхнего края экрана
   */
  protected setPosition(cursorPosition: IPosition): void {
    const positionInsideParent = {
      left: cursorPosition.left,
      top: cursorPosition.top,
    };

    const parent: HTMLElement | null = this.control.parentElement;

    if (parent !== null) {
      const parentCoords: DOMRect = parent.getBoundingClientRect();
      positionInsideParent.left -= parentCoords.left;
      positionInsideParent.top -= parentCoords.top;
    }

    this.lastPosition = positionInsideParent;
  }

  /**
   * Возвращает последнюю сохранённую позицию курсора
   * @returns {ICursorPosition} - объект с позицией курсора относительно
   * левого и верхнего края родительского контейнера
   */
  getPosition(): IPosition {
    return this.lastPosition;
  }

  /**
   * Возвращает div элемент
   * @returns {HTMLDivElement} - HTML div элемент
   */
  getControl(): HTMLDivElement {
    return this.control;
  }

  /**
   * Возвращает размер элемента
   * @returns {ISize} - объект с шириной и высотой элемента
   */
  getSize(): ISize {
    return {
      width: this.control.offsetWidth,
      height: this.control.offsetHeight,
    };
  }

  /**
   * Меняет ориентацию элемента на горизонтальную
   */
  switchToHorizontal(): void {
    const mainClass = this.control.classList[0];
    this.control.classList.remove(`${mainClass}_vertical`);
    this.control.classList.add(`${mainClass}_horizontal`);
  }

  /**
   * Меняет ориентацию элемента на вертикальную
   */
  switchToVertical(): void {
    const mainClass = this.control.classList[0];
    this.control.classList.remove(`${mainClass}_horizontal`);
    this.control.classList.add(`${mainClass}_vertical`);
  }

  /**
   * Удаляет элемент
   */
  remove(): void {
    this.control.remove();
  }

  /**
   * Возвращает текущую ориентацию элемента
   * @returns {string} - текущая ориентация элемента
   */
  getOrientation(): string {
    const mainClass = this.control.classList[0];
    const classWithOrientation = this.control.classList[1];
    return classWithOrientation.replace(`${mainClass}_`, '');
  }

  /**
   * Возвращает DOMRect объект элемента
   * @returns {DOMRect} - DOMRect объект элемента
   */
  getRect(): DOMRect {
    return this.control.getBoundingClientRect();
  }

  /**
   * Возвращает значение запрашиваемого стиля
   * @returns {string | undefined} - значение запрашиваемого стиля
   */
  getStyle(styleName: string): string | undefined {
    return document.defaultView
      ?.getComputedStyle(this.control, null)
      .getPropertyValue(styleName);
  }
}

export default UIControl;
