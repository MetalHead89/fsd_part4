/* eslint-disable comma-dangle */
import { IScalePointParams, ISize } from '../../interfaces';
import UIControl from '../ui-control/ui-control';

class Scale extends UIControl {
  constructor(orientation?: string) {
    super('scale', orientation);
    this.init();
  }

  private init(): void {
    this.handleScaleClick = this.handleScaleClick.bind(this);
    this.control.addEventListener('click', this.handleScaleClick);
  }

  private handleScaleClick(event: MouseEvent): void {
    this.setPosition({ left: event.clientX, top: event.clientY });
    this.subject.notify('clickToScale');
  }

  getPointSize(value: number): ISize {
    this.addPoint({
      position: { left: 0, top: 0 },
      size: { width: 0, height: 0 },
      value,
    });

    const pointSize = { width: 0, height: 0 };
    const scalePoint: HTMLDivElement | null =
      this.control.querySelector('.scale__point');

    pointSize.width = scalePoint?.offsetWidth || 0;
    pointSize.height = scalePoint?.offsetHeight || 0;
    scalePoint?.remove();

    return pointSize;
  }

  addPoints(points: IScalePointParams[]): void {
    points.forEach((point) => this.addPoint(point));
  }

  private addPoint(point: IScalePointParams): void {
    const orientation = this.getOrientation();
    const scalePoint: HTMLElement = document.createElement('div');
    scalePoint.classList.add('scale__point', `scale__point_${orientation}`);
    if (point.size.width > 0) {
      scalePoint.style.width = `${point.size.width}px`;
    }

    if (orientation === 'horizontal') {
      this.control.style.height = `${point.size.height}px`;
    } else {
      this.control.style.width = `${point.size.width}px`;
    }

    const divisionMarker: HTMLElement = document.createElement('div');
    divisionMarker.classList.add('scale__point-marker');

    const divisionLabel: HTMLElement = document.createElement('div');
    divisionLabel.classList.add(
      'scale__point-label',
      `scale__point-label_${orientation}`
    );
    divisionLabel.innerText = point.value.toString();

    scalePoint.style.left = `${point.position.left}px`;
    scalePoint.style.top = `${point.position.top}px`;

    scalePoint.append(divisionMarker);
    scalePoint.append(divisionLabel);
    this.control.append(scalePoint);
  }
}

export default Scale;
