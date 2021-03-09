import { IPosition, ISize } from '../../interfaces';
import Subject from '../../subject/subject';

export default class Element {
  protected element: HTMLDivElement;
  protected lastPosition: IPosition;
  subject: Subject;

  constructor(name: string, orientation?: string) {
    const element = document.createElement('div');
    this.element = element;
    this.subject = new Subject();
    this.lastPosition = { left: 0, top: 0 };

    let orientationClass = `${name}_horizontal`;
    if (orientation) {
      orientationClass = `${name}_${orientation}`;
    }
    this.element.classList.add(`${name}`, orientationClass);
  }

  /**
   * Возвращает позицию курсора
   * @param {ICursorPosition} cursorPosition - объект с позицией курсора
   * относительно левого и верхнего края экрана
   * @returns {ICursorPosition} - объект с позицией курсора относительно
   * левого и верхнего края родительского контейнера
   */
  protected setPosition(cursorPosition: IPosition): void {
    const positionInsideParent = {
      left: cursorPosition.left,
      top: cursorPosition.top,
    };

    const parrent: HTMLElement | null = this.element.parentElement;

    if (parrent !== null) {
      const parrentCoords: DOMRect = parrent.getBoundingClientRect();
      positionInsideParent.left -= parrentCoords.left;
      positionInsideParent.top -= parrentCoords.top;
    }

    this.lastPosition = positionInsideParent;
  }

  getPosition(): IPosition {
    return this.lastPosition;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  getSize(): ISize {
    return {
      width: this.element.offsetWidth,
      height: this.element.offsetHeight,
    };
  }

  switchToHorizontal(): void {
    const mainClass = this.element.classList[0];
    this.element.classList.remove(`${mainClass}_vertical`);
    this.element.classList.add(`${mainClass}_horizontal`);
  }

  switchToVertical(): void {
    const mainClass = this.element.classList[0];
    this.element.classList.remove(`${mainClass}_horizontal`);
    this.element.classList.add(`${mainClass}_vertical`);
  }

  remove(): void {
    this.element.remove();
  }

  getOrientation(): string {
    const mainClass = this.element.classList[0];
    const classWithOrientation = this.element.classList[1];
    return classWithOrientation.replace(`${mainClass}_`, '');
  }
}
