/* eslint-disable comma-dangle */
import { IPointsSize, IScalePointParams, ISize } from '../../interfaces';
import UIControl from '../ui-control/ui-control';

class Scale extends UIControl {
  constructor(orientation?: string) {
    super('scale', orientation);
    this.init();
  }

  getPointsSize(value: number): IPointsSize {
    return {
      point: this.getPointSize(value),
      emptyPoint: this.getPointSize(value, true),
    };
  }

  addPoints(points: IScalePointParams[]): void {
    points.forEach((point) => this.addPoint(point));
  }

  private init(): void {
    this.handleScaleClick = this.handleScaleClick.bind(this);
    this.control.addEventListener('click', this.handleScaleClick);
  }

  private handleScaleClick(event: MouseEvent): void {
    this.setPosition({ left: event.clientX, top: event.clientY });
    this.subject.notify('clickToScale');
  }

  private getPointSize(value: number, isEmpty = false): ISize {
    this.addPoint(
      {
        isEmpty,
        position: { left: 0, top: 0 },
        size: { width: 0, height: 0 },
        value,
      },
    );

    const pointSize = { width: 0, height: 0 };
    const scalePoint: HTMLDivElement | null =
      this.control.querySelector('.scale__point');

    pointSize.width = scalePoint?.offsetWidth || 0;
    pointSize.height = scalePoint?.offsetHeight || 0;
    scalePoint?.remove();

    return pointSize;
  }

  private addPoint({
    position,
    size,
    value,
    isEmpty,
  }: IScalePointParams): void {
    const orientation = this.getOrientation();
    const scalePoint: HTMLElement = document.createElement('div');
    scalePoint.classList.add('scale__point', `scale__point_${orientation}`);
    if (size.width > 0) {
      scalePoint.style.width = `${size.width}px`;
    }

    if (orientation === 'horizontal') {
      this.control.style.height = `${size.height}px`;
    } else {
      this.control.style.width = `${size.width}px`;
    }

    const divisionMarker: HTMLElement = document.createElement('div');
    divisionMarker.classList.add('scale__point-marker');

    const divisionLabel: HTMLElement = document.createElement('div');
    divisionLabel.classList.add(
      'scale__point-label',
      `scale__point-label_${orientation}`
    );
    if (isEmpty) {
      divisionMarker.classList.add('scale__point-marker_empty');
      divisionLabel.innerText = '';
    } else {
      divisionLabel.innerText = value.toString();
    }

    scalePoint.style.left = `${position.left}px`;
    scalePoint.style.top = `${position.top}px`;

    scalePoint.append(divisionMarker);
    scalePoint.append(divisionLabel);
    this.control.append(scalePoint);
  }
}

export default Scale;
