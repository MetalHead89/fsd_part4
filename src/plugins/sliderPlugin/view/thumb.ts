import {
  IThumbSize, IThumbShift, IThumbPosition, ICursorPosition,
} from '../interfaces';

import Observer from '../observer/observer';

/**
 * Класс бегунка. Содержит HTML элемент бегунка и организовывает управление им
 */
class Thumb {
  private element: HTMLDivElement;
  private observer: Observer;
  private shift: IThumbShift = { shiftX: 0, shiftY: 0 };
  private onMouseMoveHandler = this.drag.bind(this);
  private onMouseUpHandler = this.endDrag.bind(this);

  constructor(thumbElement: HTMLDivElement, observer: Observer) {
    this.element = thumbElement;
    this.observer = observer;
    this.addMousedownEventListener();
    this.addTouchstartEventListener();
    this.disableDragAndDrop();
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
    this.element.addEventListener('mousedown', this.moveMouse.bind(this));
  }

  /**
   * Обработка перемещения мыши
   * @param {MouseEvent} event - объект события клика
   */
  private moveMouse(event: MouseEvent): void {
    this.startDrag(event.clientX, event.clientY);
  }

  /**
   * Добавляет событие касания бегунка
   */
  private addTouchstartEventListener(): void {
    this.element.addEventListener('touchstart', this.moveTouch.bind(this));
  }

  /**
   * Обработка перемещения бегунка пальцем
   * @param {TouchEvent} event - объект события перемещения пальца при касании
   */
  private moveTouch(event: TouchEvent): void {
    this.startDrag(event.targetTouches[0].pageX, event.targetTouches[0].pageY);
  }

  /**
   * Возвращает HTML элемент бегунка
   * @returns {HTMLDivElement} - div элемент бегунка
   */
  getElement(): HTMLDivElement {
    return this.element;
  }

  /**
   * Возвращает ширину и высоту бегунка
   * @returns {IThumbSize} - ширина и высота бегунка
   */
  getSize(): IThumbSize {
    const thumbSize: IThumbSize = {
      width: this.element.offsetWidth,
      height: this.element.offsetHeight,
    };

    return thumbSize;
  }

  /**
   * Устанавливает z-индекс бегунка
   * @param {string} zIndex - значение z-индекса
   */
  setZIndex(zIndex: string): void {
    this.element.style.zIndex = zIndex;
  }

  /**
   * Передвигает бегунок на позицию из параметра position
   * @param {IThumbPosition} position - объект с позицией бегунка относительно левого
   * и верхнего края родительского контейнера
   */
  moveTo(position: IThumbPosition): void {
    this.element.style.left = `${position.left}px`;
    this.element.style.top = `${position.top}px`;
  }

  /**
   * Удаляет бегунок из DOM
   */
  remove(): void {
    this.element.remove();
  }

  /**
   * Подготавливает бегунок к передвижению
   * @param {number} cursorX - позиция курсора по горизонтали
   * @param {number} cursorY - позиция курсора по вертикали
   */
  private startDrag(cursorX: number, cursorY: number): void {
    this.setZIndex('3');
    this.observer.notify('changeZIndexToAnotherThumb', this.element);

    const thumbCoords: DOMRect = this.element.getBoundingClientRect();

    this.shift.shiftX = cursorX - thumbCoords.left;
    this.shift.shiftY = cursorY - thumbCoords.top;

    document.addEventListener('mousemove',
      this.onMouseMoveHandler as EventListenerOrEventListenerObject);
    document.addEventListener('mouseup',
      this.onMouseUpHandler as EventListenerOrEventListenerObject);

    document.addEventListener('touchmove',
      this.onMouseMoveHandler as EventListenerOrEventListenerObject);
    document.addEventListener('touchend',
      this.onMouseUpHandler as EventListenerOrEventListenerObject);
  }

  /**
   * Передает данные о передвижении бегунка своим подписчикам
   * @param {MouseEvent | TouchEvent} event - событие курсора или касания
   */
  private drag(event: MouseEvent | TouchEvent): void {
    let notifyMessage = 'thumbOneIsDragged';

    if (this.element.classList.contains('slider__thumb-two')) {
      notifyMessage = 'thumbTwoIsDragged';
    }

    if (event instanceof MouseEvent) {
      this.observer.notify(notifyMessage, this.getPosition({ x: event.clientX, y: event.clientY }));
    } else {
      this.observer.notify(notifyMessage, this.getPosition({
        x: event.targetTouches[0].pageX,
        y: event.targetTouches[0].pageY,
      }));
    }
  }

  /**
   * Возвращает позицию курсора
   * @param {ICursorPosition} cursorPosition - объект с позицией курсора
   * относительно левого и верхнего края экрана
   * @returns {ICursorPosition} - объект с позицией курсора относительно
   * левого и верхнего края родительского контейнера
   */
  private getPosition(cursorPosition: ICursorPosition): IThumbPosition {
    const positionInsideParent: IThumbPosition = { left: cursorPosition.x, top: cursorPosition.y };

    const parrent: HTMLElement | null = this.element.parentElement;

    if (parrent !== null) {
      const parrentCoords: DOMRect = parrent.getBoundingClientRect();
      positionInsideParent.left = positionInsideParent.left
        - parrentCoords.left - this.shift.shiftX;
      positionInsideParent.top = positionInsideParent.top
        - parrentCoords.top - this.shift.shiftY;
    }

    return positionInsideParent;
  }

  /**
   * Завершает передвижение бегунка, удаляя слушателей событий, которые больше не нужны
   */
  private endDrag(): void {
    document.removeEventListener('mousemove', this.onMouseMoveHandler as EventListenerOrEventListenerObject);
    document.removeEventListener('mouseup', this.onMouseUpHandler as EventListenerOrEventListenerObject);
    document.removeEventListener('touchmove', this.onMouseMoveHandler as EventListenerOrEventListenerObject);
    document.removeEventListener('touchend', this.onMouseUpHandler as EventListenerOrEventListenerObject);
  }
}

export default Thumb;
