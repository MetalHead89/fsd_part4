import UIControl from '../../ui-control/ui-control';

jest.mock('../../ui-control/ui-control');

export default class PopUp extends UIControl {
  private TEST_OK = true;

  constructor() {
    super('slider__pop-up');
  }

  update(): boolean {
    return this.TEST_OK;
  }
}
