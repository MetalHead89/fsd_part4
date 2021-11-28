import { IScalePointParams } from '../../../interfaces';
import UIControl from '../../UIControl/UIControl';

jest.mock('../../ui-control/ui-control');

export default class PopUp extends UIControl {
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
      this.control.append(div);
    }
  }
}
