import UIControl from '../../ui-control/ui-control';

jest.mock('../../ui-control/ui-control');

export default class ProgressBar extends UIControl {
  private TEST_OK = true;

  constructor() {
    super('slider__progress-bar');
  }

  update(): boolean {
    return this.TEST_OK;
  }
}
