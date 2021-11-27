/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */

import { IFullPointParams, ISize } from '../../interfaces';
import UIControl from '../ui-control/ui-control';

class Scale extends UIControl {
  constructor(orientation?: string) {
    super('scale', orientation);
    this.init();
  }

  addPoints(points: IFullPointParams[]): void {
    points.forEach((point) => this.addPoint(point));
  }

  getPointSize(value: number): ISize {
    this.addPoint({
      position: { left: 0, top: 0 },
      size: { width: 0, height: 0 },
      value,
    });

    const scalePoint: HTMLDivElement | null = this.control.querySelector('.scale__point');

    const pointSize = {
      width: scalePoint?.offsetWidth || 0,
      height: scalePoint?.offsetHeight || 0,
    };

    scalePoint?.remove();

    return pointSize;
  }

  private init(): void {
    this.handleScaleClick = this.handleScaleClick.bind(this);
    this.control.addEventListener('click', this.handleScaleClick);
  }

  private handleScaleClick(event: MouseEvent): void {
    const position = this.getPositionInsideParent({ left: event.clientX, top: event.clientY });
    this.observer.notify('clickToScale', position);
  }

  private addPoint({ position, size, value }: IFullPointParams): void {
    const orientation = this.getOrientation();
    const scalePoint: HTMLElement = document.createElement('div');
    scalePoint.classList.add('scale__point', `scale__point_orientation_${orientation}`);
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
      `scale__point-label_orientation_${orientation}`
    );
    divisionLabel.innerText = value.toString();

    scalePoint.style.left = `${position.left}px`;
    scalePoint.style.top = `${position.top}px`;

    scalePoint.append(divisionMarker);
    scalePoint.append(divisionLabel);
    this.control.append(scalePoint);
  }
}

export default Scale;
