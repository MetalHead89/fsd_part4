import { IScalePointParams, ISize } from '../../interfaces';
import Element from '../element/element';

class Scale extends Element {
  constructor() {
    super();
    this.element.classList.add('slider__scale', 'slider__scale_horizontal');
  }

  getPointSize(value: number): ISize {
    this.addScalePoint({
      position: { left: 0, top: 0 },
      pointSize: { width: 0, height: 0 },
      value,
    });

    const pointSize = { width: 0, height: 0 };
    const scalePoint: HTMLDivElement | null = this.element.querySelector(
      '.slider__scale-point',
    );
    if (scalePoint !== null) {
      pointSize.width = scalePoint.offsetWidth;
      pointSize.height = scalePoint.offsetHeight;
      scalePoint.remove();
    }

    return pointSize;
  }

  private addScalePoint(params: IScalePointParams): void {
    const orienation = this.getOrientation();
    const scalePoint: HTMLElement = document.createElement('div');
    scalePoint.classList.add(
      'slider__scale-point',
      `slider__scale-point_${orienation}`,
    );
    if (params.pointSize.width > 0) {
      scalePoint.style.width = `${params.pointSize.width}px`;
    }

    const divisionMarker: HTMLElement = document.createElement('div');
    divisionMarker.classList.add('slider__scale-point-marker');

    const divisionLabel: HTMLElement = document.createElement('div');
    divisionLabel.classList.add(
      'slider__scale-point-label',
      `slider__scale-point-label_${orienation}`,
    );
    divisionLabel.innerText = params.value.toString();

    scalePoint.style.left = `${params.position.left}px`;
    scalePoint.style.top = `${params.position.top}px`;

    scalePoint.append(divisionMarker);
    scalePoint.append(divisionLabel);
    this.element.append(scalePoint);
  }
}

export default Scale;
