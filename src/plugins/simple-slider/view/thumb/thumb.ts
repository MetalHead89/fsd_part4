/* eslint operator-linebreak: ["error", "after"] */
/* eslint-disable comma-dangle */
import { IPosition } from '../../interfaces';
import Element from '../element/element';

export default class Thumb extends Element {
  private shift = { shiftX: 0, shiftY: 0 };
  private onMouseMoveHandler = this.drag.bind(this);
  private onMouseUpHandler = this.endDrag.bind(this);

  constructor(orientation?: string) {
    super('slider__thumb', orientation);

    this.addMousedownEventListener();
    this.disableDragAndDrop();
  }

  /**
   * Устанавливает z-index
   * @param {number} index - новое значение z-индекса
   */
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
    this.element.addEventListener('pointerdown', this.clickToThumb.bind(this));
  }

  /**
   * Обработка касания бегунка мышкой
   * @param {PointerEvent} event - объект события клика
   */
  private clickToThumb(event: PointerEvent): void {
    Thumb.disableSelection();

    const thumbCoords: DOMRect = this.element.getBoundingClientRect();

    this.shift.shiftX = event.clientX - thumbCoords.left;
    this.shift.shiftY = event.clientY - thumbCoords.top;

    document.addEventListener('pointermove', this.onMouseMoveHandler);
    document.addEventListener('pointerup', this.onMouseUpHandler);

    // document.addEventListener('touchmove', this.onMouseMoveHandler);
    // document.addEventListener('touchend', this.onMouseUpHandler);

    this.subject.notify('thumbIsCatched');
    this.increaseZIndex();
  }

  /**
   * Увеличивает z-index на единицу
   */
  private increaseZIndex() {
    const zIndex = document.defaultView
      ?.getComputedStyle(this.element, null)
      .getPropertyValue('z-index');
    if (zIndex !== undefined) {
      this.element.style.zIndex = (zIndex + 1).toString();
    }
  }

  /**
   * Возвращает z-index к значению по-умолчанию
   */
  resetZIndex(): void {
    this.element.style.zIndex = '';
  }

  /**
   *  Оповещает подписчиков о том, что бегунок пытаются переместить
   */
  private drag(event: PointerEvent): void {
    this.setPosition({
      left: event.clientX,
      top: event.clientY,
    });

    this.subject.notify('thumbIsDragged');
  }

  /**
   * Устанавливает позицию курсора
   * @param {IPosition} cursorPosition - объект с позицией курсора
   * относительно левого и верхнего края экрана
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
      'pointermove',
      this.onMouseMoveHandler as EventListenerOrEventListenerObject
    );
    document.removeEventListener(
      'pointerup',
      this.onMouseUpHandler as EventListenerOrEventListenerObject
    );
    // document.removeEventListener(
    //   'touchmove',
    //   this.onMouseMoveHandler as EventListenerOrEventListenerObject
    // );
    // document.removeEventListener(
    //   'touchend',
    //   this.onMouseUpHandler as EventListenerOrEventListenerObject
    // );
  }

  /**
   * Перемещает бегунок на новую позицию
   * @param {IPosition} position - объект с новой позицией бегунка
   */
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
    document.onpointerdown = () => false;
  }

  /**
   * Включение выделения текста
   */
  private static enableSelection() {
    document.onselectstart = null;
    document.onpointerdown = null;
  }
}
