/* eslint-disable comma-dangle */
import { IScalePointParams, ISize } from '../../interfaces';
import Element from '../element/element';

class Scale extends Element {
  constructor(orientation?: string) {
    super('scale', orientation);
    this.init();
  }

  /**
   * Инициализация шкалы, подключение обработчиков событий
   */
  private init(): void {
    this.element.addEventListener('click', this.clickToScale.bind(this));
  }

  /**
   * Обработка клика по шкале
   * @param {MouseEvent} event - объект события click
   */
  private clickToScale(event: MouseEvent): void {
    this.setPosition({ left: event.clientX, top: event.clientY });
    this.subject.notify('clickToScale');
  }

  /**
   * Возвращает размер одного деления шкалы
   * @param {number} value - значение деления шкалы
   * @returns {ISize} - объект с шириной и высотой одного деления шкалы
   */
  getPointSize(value: number): ISize {
    this.addPoint({
      position: { left: 0, top: 0 },
      size: { width: 0, height: 0 },
      value,
    });

    const pointSize = { width: 0, height: 0 };
    const scalePoint: HTMLDivElement | null = this.element.querySelector(
      '.scale__point',
    );

    pointSize.width = scalePoint?.offsetWidth || 0;
    pointSize.height = scalePoint?.offsetHeight || 0;
    scalePoint?.remove();

    return pointSize;
  }

  /**
   * Добавляет деления на шкалу
   * @param {IScalePointParams} points - массив объектов с параметрами всех делений шкалы
   */
  addPoints(points: IScalePointParams[]): void {
    for (let point = 0; point < points.length; point += 1) {
      this.addPoint(points[point]);
    }
  }

  /**
   * Добавляет на шкалу одно деление
   * @param point - объект с параметрами одного деления шкалы
   */
  private addPoint(point: IScalePointParams): void {
    const orientation = this.getOrientation();
    const scalePoint: HTMLElement = document.createElement('div');
    scalePoint.classList.add(
      'scale__point',
      `scale__point_${orientation}`,
    );
    if (point.size.width > 0) {
      scalePoint.style.width = `${point.size.width}px`;
    }

    if (orientation === 'horizontal') {
      this.element.style.height = `${point.size.height}px`;
    } else {
      this.element.style.width = `${point.size.width}px`;
    }

    const divisionMarker: HTMLElement = document.createElement('div');
    divisionMarker.classList.add('scale__point-marker');

    const divisionLabel: HTMLElement = document.createElement('div');
    divisionLabel.classList.add(
      'scale__point-label',
      `scale__point-label_${orientation}`,
    );
    divisionLabel.innerText = point.value.toString();

    scalePoint.style.left = `${point.position.left}px`;
    scalePoint.style.top = `${point.position.top}px`;

    scalePoint.append(divisionMarker);
    scalePoint.append(divisionLabel);
    this.element.append(scalePoint);
  }
}

export default Scale;
