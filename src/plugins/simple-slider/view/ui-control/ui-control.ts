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

    if (parent) {
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

  getControl(): HTMLDivElement {
    return this.control;
  }

  getSize(): ISize {
    return {
      width: this.control.offsetWidth,
      height: this.control.offsetHeight,
    };
  }

  switchToHorizontal(): void {
    const mainClass = this.control.classList[0];
    this.control.classList.remove(`${mainClass}_vertical`);
    this.control.classList.add(`${mainClass}_horizontal`);
  }

  switchToVertical(): void {
    const mainClass = this.control.classList[0];
    this.control.classList.remove(`${mainClass}_horizontal`);
    this.control.classList.add(`${mainClass}_vertical`);
  }

  remove(): void {
    this.control.remove();
  }

  getOrientation(): string {
    const mainClass = this.control.classList[0];
    const classWithOrientation = this.control.classList[1];
    return classWithOrientation.replace(`${mainClass}_`, '');
  }

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
