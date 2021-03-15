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
   * Сохраняет позицию курсора относительно левого и верхнего края родительского контейнера
   * @param {IPosition} cursorPosition - объект с позицией курсора
   * относительно левого и верхнего края экрана
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
  getElement(): HTMLDivElement {
    return this.element;
  }

  /**
   * Возвращает размер элемента
   * @returns {ISize} - объект с шириной и высотой элемента
   */
  getSize(): ISize {
    return {
      width: this.element.offsetWidth,
      height: this.element.offsetHeight,
    };
  }

  /**
   * Меняет ориентацию элемента на горизонтальную
   */
  switchToHorizontal(): void {
    const mainClass = this.element.classList[0];
    this.element.classList.remove(`${mainClass}_vertical`);
    this.element.classList.add(`${mainClass}_horizontal`);
  }

  /**
   * Меняет ориентацию элемента на вертикальную
   */
  switchToVertical(): void {
    const mainClass = this.element.classList[0];
    this.element.classList.remove(`${mainClass}_horizontal`);
    this.element.classList.add(`${mainClass}_vertical`);
  }

  /**
   * Удаляет элемент
   */
  remove(): void {
    this.element.remove();
  }

  /**
   * Возвращает текущую ориентацию элемента
   * @returns {string} - текущая ориентация элемента
   */
  getOrientation(): string {
    const mainClass = this.element.classList[0];
    const classWithOrientation = this.element.classList[1];
    return classWithOrientation.replace(`${mainClass}_`, '');
  }

  getRect(): DOMRect {
    return this.element.getBoundingClientRect();
  }
}
