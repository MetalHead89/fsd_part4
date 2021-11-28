import UIControl from '../../UIControl/UIControl';

jest.mock('../../ui-control/ui-control');

export default class Thumb extends UIControl {
  private TEST_OK = true;

  constructor() {
    super('slider__thumb');
  }

  resetZIndex(): boolean {
    return this.TEST_OK;
  }

  moveTo(): boolean {
    return this.TEST_OK;
  }

  register(): boolean {
    return this.TEST_OK;
  }
}
