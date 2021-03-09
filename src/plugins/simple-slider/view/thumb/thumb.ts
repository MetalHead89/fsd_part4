/* eslint operator-linebreak: ["error", "after"] */
/* eslint-disable comma-dangle */
import { IPosition } from '../../interfaces';
import Element from '../element/element';

class Thumb extends Element {
  private shift = { shiftX: 0, shiftY: 0 };
  private onMouseMoveHandler = this.drag.bind(this);
  private onMouseUpHandler = this.endDrag.bind(this);

  constructor(orientation?: string) {
    super('slider__thumb', orientation);

    this.addMousedownEventListener();
    this.disableDragAndDrop();
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
    Thumb.disableSelection();

    const thumbCoords: DOMRect = this.element.getBoundingClientRect();

    this.shift.shiftX = event.clientX - thumbCoords.left;
    this.shift.shiftY = event.clientY - thumbCoords.top;

    document.addEventListener('mousemove', this.onMouseMoveHandler);
    document.addEventListener('mouseup', this.onMouseUpHandler);

    document.addEventListener('touchmove', this.onMouseMoveHandler);
    document.addEventListener('touchend', this.onMouseUpHandler);

    this.subject.notify('thumbIsCatched');
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

    this.subject.notify('thumbIsDragged');
  }

  /**
   * Возвращает позицию курсора
   * @param {ICursorPosition} cursorPosition - объект с позицией курсора
   * относительно левого и верхнего края экрана
   * @returns {ICursorPosition} - объект с позицией курсора относительно
   * левого и верхнего края родительского контейнера
   */
  protected setPosition(cursorPosition: IPosition): void {
    super.setPosition(cursorPosition);
    this.lastPosition.left -= this.shift.shiftX;
    this.lastPosition.top -= this.shift.shiftY;
  }

  /**
   * Завершает передвижение бегунка, удаляя слушателей событий, которые больше не нужны
   */
  private endDrag(): void {
    Thumb.enableSelection();

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
    this.lastPosition = position;
    this.element.style.left = `${position.left}px`;
    this.element.style.top = `${position.top}px`;
  }

  /**
   * Отключение выделения при перетягивании бегунка
   */
  private static disableSelection() {
    document.onselectstart = () => false;
    document.onmousedown = () => false;
  }

  /**
   * Включение выделения текста
   */
  private static enableSelection() {
    document.onselectstart = null;
    document.onmousedown = null;
  }
}

export default Thumb;
