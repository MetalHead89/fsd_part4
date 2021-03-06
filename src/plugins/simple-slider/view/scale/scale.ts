/* eslint-disable comma-dangle */
import { IScalePointParams, ISize } from '../../interfaces';
import Element from '../element/element';

class Scale extends Element {
  constructor(orientation?: string) {
    super('slider__scale', orientation);
  }

  getPointSize(value: number): ISize {
    this.addPoint({
      position: { left: 0, top: 0 },
      paddings: { left: 0, top: 0 },
      size: { width: 0, height: 0 },
      value,
    });

    const pointSize = { width: 0, height: 0 };
    const scalePoint: HTMLDivElement | null = this.element.querySelector(
      '.slider__scale-point'
    );
    if (scalePoint !== null) {
      pointSize.width = scalePoint.offsetWidth;
      pointSize.height = scalePoint.offsetHeight;
      scalePoint.remove();
    }

    return pointSize;
  }

  addPoints(points: IScalePointParams[]): void {
    for (let point = 0; point < points.length; point += 1) {
      this.addPoint(points[point]);
    }
  }

  private addPoint(point: IScalePointParams): void {
    const orienation = this.getOrientation();
    const scalePoint: HTMLElement = document.createElement('div');
    scalePoint.classList.add(
      'slider__scale-point',
      `slider__scale-point_${orienation}`
    );
    if (point.size.width > 0) {
      scalePoint.style.width = `${point.size.width}px`;
    }

    const divisionMarker: HTMLElement = document.createElement('div');
    divisionMarker.classList.add('slider__scale-point-marker');

    const divisionLabel: HTMLElement = document.createElement('div');
    divisionLabel.classList.add(
      'slider__scale-point-label',
      `slider__scale-point-label_${orienation}`
    );
    divisionLabel.innerText = point.value.toString();

    scalePoint.style.left = `${point.position.left}px`;
    scalePoint.style.top = `${point.position.top}px`;
    scalePoint.style.paddingLeft = `${point.paddings.left}px`;
    scalePoint.style.paddingTop = `${point.paddings.top}px`;

    scalePoint.append(divisionMarker);
    scalePoint.append(divisionLabel);
    this.element.append(scalePoint);
  }
}

export default Scale;
