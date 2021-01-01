import {
  IScalePointSize,
  ICursorPosition,
  IBorderCoords,
} from '../interfaces';

import Observer from '../observer/observer';

/**
 * Класс шкалы. Содержит HTML элемент шкалы и организовывает управление ею
 */
class Scale {
  private element: HTMLDivElement;
  private observer: Observer;
  private orientation: string;

  constructor(element: HTMLDivElement, observer: Observer) {
    this.element = element;
    this.observer = observer;
    this.orientation = element.classList.contains('slider__scale_vertical') ? 'vertical' : 'horizontal';
    this.addClickEventListener();
  }

  /**
   * Добавляет событие на клик по шкале
   */
  private addClickEventListener(): void {
    this.element.addEventListener('click', this.clickToScale.bind(this));
  }

  /**
   * Обработка клика по шкале. Метод отправляет уведомление с координатами курсора
   * @param {MouseEvent} event - объект события клика
   */
  private clickToScale(event: MouseEvent): void {
    this.observer.notify('clickOnTheScale', this.getPosition({ x: event.clientX, y: event.clientY }));
  }

  /**
   * Возвращает максимальный размер точки шкалы
   * @param {IScalePointSize} maxValue - объект с шириной и высотой  последней точки шкалы
   */
  getScalePointMaxSize(maxValue: number): IScalePointSize {
    const scalePoint = this.addScalePoint(0, 0, maxValue);
    const scalePointWidth = scalePoint.offsetWidth;
    const scalePointHeight = scalePoint.offsetHeight;
    scalePoint.remove();

    return { width: scalePointWidth, height: scalePointHeight };
  }

  /**
   * Добавляет новую точку со значением на шкалу
   * @param {number} position - позиция точки со значением относительно левого или верхнего края
   * (зависит от ориентации слайдера) родительского контейнера
   * @param {number} scalePointWidth - ширина точки шкалы
   * @param {number} pointValue - значение точки шкалы
   */
  addScalePoint(position: number, scalePointWidth: number, pointValue: number): HTMLElement {
    const scalePoint: HTMLElement = document.createElement('div');

    if (this.orientation === 'horizontal') {
      scalePoint.className = 'slider__scale-point slider__scale-point_horizontal';
    } else {
      scalePoint.className = 'slider__scale-point slider__scale-point_vertical';
    }

    if (scalePointWidth > 0) {
      scalePoint.style.width = `${scalePointWidth}px`;
    }

    const divisionMarker: HTMLElement = document.createElement('div');
    divisionMarker.className = ('slider__scale-point-marker');

    const divisionLabel: HTMLElement = document.createElement('div');
    if (this.orientation === 'horizontal') {
      divisionLabel.className = ('slider__scale-point-label slider__scale-point-label_horizontal');
    } else {
      divisionLabel.className = ('slider__scale-point-label slider__scale-point-label_vertical');
    }
    divisionLabel.innerText = pointValue.toString();

    if (this.orientation === 'horizontal') {
      scalePoint.style.left = `${position}px`;
    } else {
      scalePoint.style.top = `${position}px`;
    }

    scalePoint.append(divisionMarker);
    scalePoint.append(divisionLabel);
    this.element.append(scalePoint);

    return scalePoint;
  }

  /**
   * Удаляет HTML элемент шкалы из DOM
   */
  remove(): void {
    this.element.remove();
  }

  /**
   * Установка высоты и ширины шкалы для того, чтобы по ней можно было совершать клики,
   * для перемещения бегунков
   * @param {number} width - Значение ширины шкалы
   * @param {number} height - Значение высоты шкалы
   */
  setScaleSize(width: number, height: number): void {
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
  }

  /**
   * Возвращает позицию курсора
   * @param {ICursorPosition} cursorPosition - объект с позицией курсора относительно
   * левого и верхнего края экрана
   * @returns {ICursorPosition} - объект с позицией курсора относительно левого и верхнего
   * края родительского контейнера
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

  /**
   * Возвращает координаты границ шкалы
   * @returns {IBorderCoords} - Координаты границ шкалы
   */
  getCoords(): IBorderCoords {
    const ScaleCoords = this.element.getBoundingClientRect();

    return {
      left: ScaleCoords.left,
      top: ScaleCoords.top,
      right: ScaleCoords.right,
      bottom: ScaleCoords.bottom,
    };
  }
}

export default Scale;
