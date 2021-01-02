import { ICursorPosition } from '../interfaces';

import Observer from '../observer/observer';

/**
 * Класс дорожки слайдера. Содержит HTML элемент дорожки слайдера и организовывает управление им
 */
class Track {
  private element: HTMLDivElement;
  private observer: Observer;

  constructor(element: HTMLDivElement, observer: Observer) {
    this.element = element;
    this.observer = observer;
    this.addClickEventListener();
  }

  /**
   * Добавляет событие на клик по дорожке слайдера
   */
  private addClickEventListener(): void {
    this.element.addEventListener('click', this.clickToTrack.bind(this));
  }

  /**
   * Обработка клика по дорожке. Метод отправляет уведомление с координатами курсора
   * @param {MouseEvent} event - объект события клика
   */
  private clickToTrack(event: MouseEvent): void {
    this.observer.notify('clickOnTheTrack', this.getPosition({ x: event.clientX, y: event.clientY }));
  }

  /**
   * Возвращает позицию курсора
   * @param {ICursorPosition} cursorPosition - объект с позицией курсора
   * относительно левого и верхнего края экрана
   * @returns {ICursorPosition} - объект с позицией курсора относительно
   * левого и верхнего края родительского контейнера
   */
  private getPosition(cursorPosition: ICursorPosition): ICursorPosition {
    const positionInsideParent: ICursorPosition = { ...cursorPosition };
    const parrent: HTMLElement | null = this.element.parentElement;

    if (parrent !== null) {
      const parrentCoords: DOMRect = parrent.getBoundingClientRect();
      positionInsideParent.x -= parrentCoords.left;
      positionInsideParent.y -= parrentCoords.top;
    }

    return positionInsideParent;
  }
}

export default Track;
