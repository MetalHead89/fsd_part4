import UIControl from '../../UIControl/UIControl';

jest.mock('../../ui-control/ui-control');

export default class Slider extends UIControl {
  TEST_OK = true;

  constructor() {
    super('slider');
  }

  append(control: HTMLDivElement): void {
    this.control.append(control);
  }

  resetMargins(): boolean {
    return this.TEST_OK;
  }

  setMargins(): boolean {
    return this.TEST_OK;
  }
}
