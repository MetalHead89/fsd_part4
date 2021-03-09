import { IScalePointParams } from '../../../interfaces';
import Element from '../../element/element';

jest.mock('../../element/element');

export default class PopUp extends Element {
  private TEST_OK = true;

  constructor() {
    super('slider__scale');
  }

  getPointSize(): boolean {
    return this.TEST_OK;
  }

  addPoints(points: IScalePointParams[]): void {
    for (let i = 0; i < points.length; i += 1) {
      const div = document.createElement('div');
      div.classList.add('scale-point');
      this.element.append(div);
    }
  }
}
