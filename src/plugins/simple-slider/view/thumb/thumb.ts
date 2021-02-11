/* eslint operator-linebreak: ["error", "after"] */
/* eslint-disable comma-dangle */

import { IPosition, ISize } from '../../interfaces';
import Subject from '../../subject/subject';

class Thumb extends Subject {
  private element: HTMLDivElement;
  private shift = { shiftX: 0, shiftY: 0 };
  private onMouseMoveHandler = this.drag.bind(this);
  private onMouseUpHandler = this.endDrag.bind(this);
  private position = { left: 0, top: 0 };

  constructor() {
    super();
    this.element = document.createElement('div');
    this.element.classList.add('slider__thumb', 'slider__thumb_horizontal');
    this.addMousedownEventListener();
    this.disableDragAndDrop();
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  setZIndex(index: number): void {
    this.element.style.zIndex = index.toString();
  }

  /**
   * Отключает html5 Drag and Drop
   */
  private disableDragAndDrop(): void {
    this.element.ondragstart = () => false;
  }

  /**
   * Добавляет событие на нажатие кнопки мыши на бегунке
   */
  private addMousedownEventListener(): void {
    this.element.addEventListener('mousedown', this.clickToThumb.bind(this));
  }

  /**
   * Обработка касания бегунка мышкой
   * @param {MouseEvent} event - объект события клика
   */
  private clickToThumb(event: MouseEvent): void {
    const thumbCoords: DOMRect = this.element.getBoundingClientRect();

    this.shift.shiftX = event.clientX - thumbCoords.left;
    this.shift.shiftY = event.clientY - thumbCoords.top;

    document.addEventListener('mousemove', this.onMouseMoveHandler);
    document.addEventListener('mouseup', this.onMouseUpHandler);

    document.addEventListener('touchmove', this.onMouseMoveHandler);
    document.addEventListener('touchend', this.onMouseUpHandler);

    this.notify('thumbIsCatched');
    this.increaseZIndex();
  }

  private increaseZIndex() {
    const zIndex = document.defaultView
      ?.getComputedStyle(this.element, null)
      .getPropertyValue('z-index');
    if (zIndex !== undefined) {
      this.element.style.zIndex = (zIndex + 1).toString();
    }
  }

  resetZIndex(): void {
    this.element.style.zIndex = '';
  }

  /**
   *  Оповещает подписчиков о том, что бегунок пытаются переместить
   */
  private drag(event: MouseEvent | TouchEvent): void {
    if (event instanceof MouseEvent) {
      this.setPosition({
        left: event.clientX,
        top: event.clientY,
      });
    } else {
      this.setPosition({
        left: event.targetTouches[0].pageX,
        top: event.targetTouches[0].pageY,
      });
    }

    this.notify('thumbIsDragged');
  }

  /**
   * Возвращает позицию курсора
   * @param {ICursorPosition} cursorPosition - объект с позицией курсора
   * относительно левого и верхнего края экрана
   * @returns {ICursorPosition} - объект с позицией курсора относительно
   * левого и верхнего края родительского контейнера
   */
  private setPosition(cursorPosition: IPosition): void {
    const positionInsideParent: IPosition = {
      left: cursorPosition.left,
      top: cursorPosition.top,
    };

    const parrent: HTMLElement | null = this.element.parentElement;

    if (parrent !== null) {
      const parrentCoords: DOMRect = parrent.getBoundingClientRect();
      positionInsideParent.left =
        positionInsideParent.left - parrentCoords.left - this.shift.shiftX;
      positionInsideParent.top =
        positionInsideParent.top - parrentCoords.top - this.shift.shiftY;
    }

    this.position = positionInsideParent;
  }

  getPosition(): IPosition {
    return this.position;
  }

  /**
   * Завершает передвижение бегунка, удаляя слушателей событий, которые больше не нужны
   */
  private endDrag(): void {
    document.removeEventListener(
      'mousemove',
      this.onMouseMoveHandler as EventListenerOrEventListenerObject,
    );
    document.removeEventListener(
      'mouseup',
      this.onMouseUpHandler as EventListenerOrEventListenerObject,
    );
    document.removeEventListener(
      'touchmove',
      this.onMouseMoveHandler as EventListenerOrEventListenerObject,
    );
    document.removeEventListener(
      'touchend',
      this.onMouseUpHandler as EventListenerOrEventListenerObject,
    );
  }

  moveTo(position: IPosition): void {
    this.position = position;
    this.element.style.left = `${position.left}px`;
    this.element.style.top = `${position.top}px`;
  }

  getSize(): ISize {
    return {
      width: this.element.offsetWidth,
      height: this.element.offsetHeight,
    };
  }
}

export default Thumb;
